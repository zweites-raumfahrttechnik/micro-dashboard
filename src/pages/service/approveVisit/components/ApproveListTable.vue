<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Table, TableColumn, Space, Button, Popconfirm, Tag } from '@arco-design/web-vue';

import { instance } from '@/api';
import { VISIT_APPROVE_URL } from '@/api/url';

import { useTableStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { pagination, tableData, isLoading, refreshList } = useTableStore()!;

const { isLoading: approveIsLoading, execute } = useAxios(
  VISIT_APPROVE_URL,
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

const handleApproveVisit = async (uuid: string, status: 1 | 2) => {
  await execute({ data: { uuid, status } });

  refreshList();
};
</script>

<template>
  <Table
    row-key="uuid"
    :bordered="false"
    :pagination="pagination"
    :data="tableData"
    :loading="isLoading || approveIsLoading"
    @page-change="handlePageChange"
  >
    <template #columns>
      <TableColumn title="申请名称" data-index="name" />

      <TableColumn title="服务名称">
        <template #cell="{ record }">
          {{ record.visitor.name }}
        </template>
      </TableColumn>

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

      <TableColumn title="操作">
        <template #cell="{ record }">
          <Space>
            <Popconfirm
              content="请确认是否通过此上线请求"
              @ok="() => handleApproveVisit(record.uuid, 1)"
            >
              <Button type="text" status="normal" :disabled="record.status !== 0">通过</Button>
            </Popconfirm>

            <Popconfirm
              content="请确认是否拒绝此上线请求"
              @ok="() => handleApproveVisit(record.uuid, 2)"
            >
              <Button type="text" status="danger" :disabled="record.status !== 0">拒绝</Button>
            </Popconfirm>
          </Space>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
