<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  RangePicker,
  FormInstance,
  Divider,
  Button,
  Space,
  Table,
  TableColumn,
  Popconfirm,
  TableRowSelection,
  Drawer,
} from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { THEME_URL, THEME_INSTANCE_URL } from '@/api/url';
import { ThemeListData } from '@/api/types';

import PageContainer from '@/components/PageContainer.vue';

interface SearchParams {
  pg: number;
  size: number;
  name?: string;
  user?: string;
  startAt?: string;
  endAt?: string;
}

interface SearchFormdata extends Omit<SearchParams, 'pg' | 'size' | 'startAt' | 'endAt'> {
  createAt?: string[];
}

const searchFormRef = ref<FormInstance>();

const searchFormdata = reactive<SearchFormdata>({
  name: '',
  user: '',
  createAt: [],
});

// 分页参数
const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

// 行选择器
const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: true,
  selectedRowKeys: [],
});

const { data, isLoading, execute } = useAxios<ResponseWrap<ThemeListData>>(
  THEME_URL,
  {
    method: 'GET',
    params: {
      pg: pagination.current,
      size: pagination.pageSize,
    },
  },
  instance,
);

const { isLoading: deleteIsLoading, execute: deleteExecute } = useAxios(
  THEME_URL,
  {
    method: 'DELETE',
  },
  instance,
  { immediate: false },
);

const refreshList = () => {
  const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };

  if (searchFormdata.name && searchFormdata.name !== '') {
    params.name = searchFormdata.name;
  }

  if (searchFormdata.user && searchFormdata.user !== '') {
    params.user = searchFormdata.user;
  }

  if (searchFormdata.createAt && searchFormdata.createAt.length === 2) {
    params.startAt = searchFormdata.createAt[0];
    params.endAt = searchFormdata.createAt[1];
  }

  execute({ params });
};

const tableData = computed(() => data.value?.data?.data || []);

watch(
  () => data.value?.data?.count,
  newVal => {
    pagination.total = newVal;
  },
);

// 监听分页参数变化, 发起请求
watch(
  () => pagination.current,
  () => refreshList(),
);

// 搜索按钮点击事件
const handleSearch = () => {
  refreshList();
};

// 重置 form 表单
const handleFromReset = () => {
  searchFormRef.value?.resetFields();

  if (pagination.current === 1) {
    const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };
    execute({ params });
    return;
  }

  pagination.current = 1;
};

// 更新分页参数, 触发请求
const handlePageChange = (page: number) => {
  pagination.current = page;
};

const handleDeleteService = async (uuid: string) => {
  await deleteExecute({ data: { uuids: [uuid] } });

  refreshList();
};

const handleDeleteSelect = async () => {
  if (rowSelection.selectedRowKeys?.length === 0) {
    return;
  }

  await deleteExecute({ data: { uuids: rowSelection.selectedRowKeys } });

  refreshList();
};

// 下面是关于服务实例展示的代码
const drawerVisible = ref(false);
const selectService = ref('');

const serviceInstance = computed(
  () => tableData.value.find(item => item.uuid === selectService.value)?.instance || [],
);

const { isLoading: deleteInstanceIsLoading, execute: deleteInstanceExecute } = useAxios(
  THEME_INSTANCE_URL,
  {
    method: 'DELETE',
  },
  instance,
  { immediate: false },
);

const handleShowInstance = (uuid: string) => {
  drawerVisible.value = true;
  selectService.value = uuid;
};

const handleDisableInstance = () => {
  drawerVisible.value = false;
  selectService.value = '';
};

const handleDeleteInstance = async (uuid: string) => {
  await deleteInstanceExecute({ data: { uuids: [uuid] } });

  handleDisableInstance();

  refreshList();
};
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>查询服务列表</template>

      <Row>
        <Col :flex="1">
          <Form
            ref="searchFormRef"
            :model="searchFormdata"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <Row :gutter="16">
              <Col :span="8">
                <FormItem field="name" label="服务名称">
                  <Input v-model="searchFormdata.name" placeholder="请输入服务名称" />
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem field="port" label="创建者">
                  <Input v-model="searchFormdata.user" placeholder="请输入创建者" />
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem field="status" label="创建时间">
                  <RangePicker v-model="searchFormdata.createAt" />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>

        <Divider style="height: 34px" direction="vertical" />

        <Col flex="195px">
          <Space :size="18">
            <Button type="primary" :loading="isLoading || deleteIsLoading" @click="handleSearch">
              <template #icon>
                <IconSearch />
              </template>
              搜索
            </Button>
            <Button @click="handleFromReset">
              <template #icon>
                <IconRefresh />
              </template>
              重置
            </Button>
          </Space>
        </Col>
      </Row>

      <Divider style="margin-top: 0" />

      <Row justify="end" :style="{ paddingBottom: '20px' }">
        <Col flex="86px">
          <Button type="primary" status="danger" @click="handleDeleteSelect">删除选中</Button>
        </Col>
      </Row>

      <Row>
        <Col :span="24">
          <Table
            v-model:selected-keys="rowSelection.selectedRowKeys"
            row-key="uuid"
            :bordered="false"
            :pagination="pagination"
            :data="tableData"
            :loading="isLoading || deleteIsLoading"
            :row-selection="rowSelection"
            @page-change="handlePageChange"
          >
            <template #columns>
              <TableColumn title="服务名称" data-index="name" />

              <TableColumn title="创建者">
                <template #cell="{ record }">
                  {{ record.user.nickName }}
                </template>
              </TableColumn>

              <TableColumn title="创建时间" data-index="createAt" />

              <TableColumn title="操作">
                <template #cell="{ record }">
                  <Space>
                    <Button
                      type="text"
                      status="normal"
                      @click="() => handleShowInstance(record.uuid)"
                    >
                      详情
                    </Button>

                    <Button
                      type="text"
                      status="normal"
                      @click="() => handleShowInstance(record.uuid)"
                    >
                      添加实例
                    </Button>

                    <Popconfirm
                      content="请确认是否删除此数据库连接"
                      @ok="() => handleDeleteService(record.uuid)"
                    >
                      <Button type="text" status="danger">删除</Button>
                    </Popconfirm>
                  </Space>
                </template>
              </TableColumn>
            </template>
          </Table>
        </Col>
      </Row>
    </Card>
  </PageContainer>

  <Drawer
    placement="bottom"
    height="600px"
    :visible="drawerVisible"
    :footer="false"
    @cancel="handleDisableInstance"
  >
    <template #title>服务实例列表</template>

    <Row justify="center">
      <Col :span="20">
        <Table row-key="uuid" :bordered="false" :data="serviceInstance" :pagination="false">
          <template #columns>
            <TableColumn title="实例运行IP" data-index="ip" />

            <TableColumn title="实例运行端口" data-index="port" />

            <TableColumn title="实例创建时间" data-index="createAt" />

            <TableColumn title="操作">
              <template #cell="{ record }">
                <Popconfirm
                  content="请确认是否删除此实例"
                  @ok="() => handleDeleteInstance(record.uuid)"
                >
                  <Button type="text" status="danger">删除</Button>
                </Popconfirm>
              </template>
            </TableColumn>
          </template>
        </Table>
      </Col>
    </Row>
  </Drawer>
</template>
