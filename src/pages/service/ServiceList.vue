<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  FormInstance,
  Divider,
  Button,
  Space,
  Table,
  TableColumn,
  Tag,
} from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { THEME_URL } from '@/api/url';
import { ThemeListData } from '@/api/types';

import PageContainer from '@/components/PageContainer.vue';

interface SearchParams {
  pg: number;
  size: number;
  ip?: string;
  port?: string;
  status?: string;
}

const searchFormRef = ref<FormInstance>();

const searchFormdata = reactive<{
  ip: string;
  port: string;
  status: string;
}>({
  ip: '',
  port: '',
  status: '',
});

// 分页参数
const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
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

const refreshList = () => {
  const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };
  if (searchFormdata.ip && searchFormdata.ip !== '') {
    params.ip = searchFormdata.ip;
  }

  if (searchFormdata.port && searchFormdata.port !== '') {
    params.port = searchFormdata.port;
  }

  if (searchFormdata.status) {
    params.status = searchFormdata.status;
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
                <FormItem field="ip" label="服务地址">
                  <Input v-model="searchFormdata.ip" placeholder="请输入服务地址" />
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem field="port" label="服务端口">
                  <Input v-model="searchFormdata.port" placeholder="请输入服务端口" />
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem field="status" label="服务状态">
                  <Select v-model="searchFormdata.status" placeholder="请选择服务状态" allow-clear>
                    <Option :value="1">未上线</Option>
                    <Option :value="2">已上线</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>

        <Divider style="height: 34px" direction="vertical" />

        <Col flex="195px">
          <Space :size="18">
            <Button type="primary" @click="handleSearch">
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

      <Table
        row-key="uuid"
        :bordered="false"
        :pagination="pagination"
        :data="tableData"
        :loading="isLoading"
        @page-change="handlePageChange"
      >
        <template #columns>
          <TableColumn title="服务名称" data-index="name" />
          <TableColumn title="服务运行地址">
            <template #cell="{ record }">
              {{ `${record.ip}:${record.port}` }}
            </template>
          </TableColumn>
          <TableColumn title="创建者">
            <template #cell="{ record }">
              {{ record.user.nickname }}
            </template>
          </TableColumn>
          <TableColumn title="创建时间" data-index="createAt" />
          <TableColumn title="服务上线状态">
            <template #cell="{ record }">
              <Tag v-if="record.status === 2" color="green">已上线</Tag>
              <Tag v-else color="red">未上线</Tag>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
