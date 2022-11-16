<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Table,
  TableColumn,
  Space,
  Button,
  Popconfirm,
  Tag,
  Modal,
  Form,
  FormItem,
  Input,
  Select,
  Option,
} from '@arco-design/web-vue';

import { instance } from '@/api';
import { CONFIG_APPROVE_URL } from '@/api/url';
import { reactive, ref } from 'vue';
import { useTableStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { pagination, tableData, isLoading, refreshList } = useTableStore()!;

const { isLoading: deleteIsLoading, execute: execute } = useAxios(
  CONFIG_APPROVE_URL,
  {
    method: 'POST',
  },
  instance,
  { immediate: false },
);

// 更新分页参数, 触发请求
const handlePageChange = (page: number) => {
  pagination.current = page;
};

const handleDeleteConfig = async (uuid: string, status: 1 | 2) => {
  await execute({ data: { uuid, status } });

  refreshList();
};

//修改
const handleModifyConfig = () => {
  ModifyVisible.value = true;
};
const ModifyVisible = ref(false);
const ModifyForm = reactive({
  dataID: ' ',
  content: ' ',
  type: ' ',
});

const handleCancel = async (uuid: string, status: 1 | 2) => {
  await execute({ data: { uuid, status } });

  refreshList();
};

const handleBeforeOk = async (uuid: string, status: 1 | 2) => {
  await execute({ data: { uuid, status } });

  refreshList();
};

const form = reactive<{ type: number; dataID: string; content: string }>({
  type: 1,
  dataID: '',
  content: '',
});
</script>

<template>
  <Table
    row-key="uuid"
    :bordered="false"
    :pagination="pagination"
    :data="tableData"
    :loading="isLoading || deleteIsLoading"
    @page-change="handlePageChange"
  >
    <template #columns>
      <TableColumn title="配置属性" data-index="dataId" />

      <TableColumn title="创建者">
        <template #cell="{ record }">
          {{ record.user.nickName }}
        </template>
      </TableColumn>

      <TableColumn title="创建时间" data-index="createAt" />

      <TableColumn title="审批状态">
        <template #cell="{ record }">
          <Tag v-if="record.status === 1" color="green">已通过</Tag>
          <Tag v-else-if="record.status === 2" color="red">未通过</Tag>
          <Tag v-else>待审批</Tag>
        </template>
      </TableColumn>
      <TableColumn title="配置类型">
        <template #cell="{ record }">
          <Tag v-if="record.configType === 1" color="green">已配置</Tag>
          <Tag v-else-if="record.configType === 2" color="red">未配置</Tag>
          <Tag v-else>待配置</Tag>
        </template>
      </TableColumn>
      <TableColumn title="类型">
        <template #cell="{ record }">
          <Tag v-if="record.type === 1" color="green">111</Tag>
          <Tag v-else-if="record.type === 2" color="red">222</Tag>
          <Tag v-else>333</Tag>
        </template>
      </TableColumn>
      <TableColumn title="操作">
        <template #cell="{ record }">
          <Space>
            <Popconfirm
              content="请确认是否通过此上线请求"
              @ok="() => handleDeleteConfig(record.uuid, 1)"
            >
              <Button type="text" status="normal" :disabled="record.status !== 0">通过</Button>
            </Popconfirm>

            <Popconfirm
              content="请确认是否拒绝此上线请求"
              @ok="() => handleDeleteConfig(record.uuid, 2)"
            >
              <Button type="text" status="danger" :disabled="record.status !== 0">拒绝</Button>
            </Popconfirm>
            <Button @click="handleModifyConfig" type="text" status="warning">修改</Button>
          </Space>
        </template>
        <Modal
              v-model:visible="ModifyVisible"
              @cancel="handleCancel"
              @Beforeok="handleBeforeOk"
            >
              <Form :model="ModifyForm">
                <FormItem field="dataID" label="配置属性">
                  <Input v-model="ModifyForm.dataID" />
                </FormItem>
                <FormItem field="content" label="配置内容">
                  <Input v-model="ModifyForm.content" />
                </FormItem>
                <FormItem field="type" label="类型">
                  <Select v-model="ModifyForm.type">
                    <Option value="post1">1111</Option>
                    <Option value="post2">2222</Option>
                    <Option value="post3">3333</Option>
                    <Option value="post4">4444</Option>
                    <Option value="post4">5555</Option>
                    <Option value="post4">6666</Option>
                  </Select>
                </FormItem>
              </Form>
            </Modal>
      </TableColumn>
    </template>
  </Table>
</template>
