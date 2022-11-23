<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Table, TableColumn, Space, Button, Popconfirm, Tag } from '@arco-design/web-vue';

import { instance } from '@/api';
import { CONFIG_APPROVE_PUBLISH_URL, CONFIG_APPROVE_DELETE_URL } from '@/api/url';
import { useTableStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { pagination, tableData, isLoading, refreshList } = useTableStore()!;

const { isLoading: deleteIsLoading, execute: deleteExecute } = useAxios(
  CONFIG_APPROVE_DELETE_URL,
  {
    method: 'GET',
  },
  instance,
  { immediate: false },
);

const { isLoading: publishIsLoading, execute: publisEexecute } = useAxios(
  CONFIG_APPROVE_PUBLISH_URL,
  {
    method: 'GET',
  },
  instance,
  { immediate: false },
);

// 更新分页参数, 触发请求
const handlePageChange = (page: number) => {
  pagination.current = page;
};

const handleDeleteConfig = async (uuid: string, status: 1 | 2) => {
  await deleteExecute({ data: { uuid, status } });

  refreshList();
};

const handlePubulishConfig = async (uuid: string, status: 1 | 2) => {
  await publisEexecute({ data: { uuid, status } });

  refreshList();
};
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
      <TableColumn title="配置文件名" data-index="dataId" />

      <TableColumn title="创建者">
        <template #cell="{ record }">
          {{ record.user.nickName }}
        </template>
      </TableColumn>
      <TableColumn title="创建时间" data-index="createAt" />

      <TableColumn title="审批状态">
        <template #cell="{ record }">
          <Tag v-if="record.status === 1" color="green"
            ><template #icon> <IconCheckCircleFill /> </template><span>已通过</span></Tag
          >
          <Tag v-else-if="record.status === 2" color="red"
            ><template #icon> <IconCloseCircleFill /> </template><span>未通过</span></Tag
          >
          <Tag v-else
            ><template #icon> <IconExclamationCircleFill /> </template><span>待审批</span></Tag
          >
        </template>
      </TableColumn>
      <TableColumn title="配置类型">
        <template #cell="{ record }">
          <Tag v-if="record.configType === 1" color="green"
            ><template #icon> <IconCheckCircleFill /> </template><span>已配置</span></Tag
          >
          <Tag v-else-if="record.configType === 2" color="orange"
            ><template #icon> <IconExclamationCircleFill /> </template><span>未配置</span></Tag
          >
          <Tag v-else
            ><template #icon> <IconExclamationCircleFill /> </template><span>待配置</span></Tag
          >
        </template>
      </TableColumn>
      <TableColumn title="类型">
        <template #cell="{ record }">
          <span v-if="record.type === 0">上线申请</span>
          <span v-else-if="record.type === 1">修改申请</span>
          <span v-else>删除申请</span>
        </template>
      </TableColumn>
      <TableColumn title="操作">
        <template #cell="{ record }">
          <Space v-if="record.type === 0">
            <Popconfirm
              content="请确认是否通过此上线请求"
              @ok="() => handlePubulishConfig(record.uuid, 1)"
            >
              <Button type="text" status="normal" :disabled="record.status !== 0">同意上线</Button>
            </Popconfirm>
            <Popconfirm
              content="请确认是否拒绝此上线请求"
              @ok="() => handlePubulishConfig(record.uuid, 2)"
            >
              <Button type="text" status="danger" :disabled="record.status !== 0">拒绝上线</Button>
            </Popconfirm>
          </Space>
          <Space v-if="record.type === 1">
            <Popconfirm
              content="请确认是否通过此修改请求"
              @ok="() => handlePubulishConfig(record.uuid, 1)"
            >
              <Button type="text" status="normal" :disabled="record.status !== 0">同意修改</Button>
            </Popconfirm>
            <Popconfirm
              content="请确认是否拒绝此修改请求"
              @ok="() => handlePubulishConfig(record.uuid, 2)"
            >
              <Button type="text" status="danger" :disabled="record.status !== 0">拒绝修改</Button>
            </Popconfirm>
          </Space>
          <Space v-if="record.type === 2">
            <Popconfirm
              content="请确认是否通过此删除请求"
              @ok="() => handleDeleteConfig(record.uuid, 1)"
            >
              <Button type="text" status="normal" :disabled="record.status !== 0">同意删除</Button>
            </Popconfirm>
            <Popconfirm
              content="请确认是否拒绝此删除请求"
              @ok="() => handleDeleteConfig(record.uuid, 2)"
            >
              <Button type="text" status="danger" :disabled="record.status !== 0">拒绝删除</Button>
            </Popconfirm>
          </Space>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
