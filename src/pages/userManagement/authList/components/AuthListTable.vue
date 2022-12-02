<script setup lang="ts">
import { Table, TableColumn, Space, Button, Popconfirm } from '@arco-design/web-vue';
import { useTableStore } from '../hooks';
const { pagination, tableData, isLoading, refreshList } = useTableStore()!;

// 更新分页参数, 触发请求
const handlePageChange = (page: number) => {
  pagination.current = page;
};
</script>

<template>
  <Table
    row-key="uuid"
    :bordered="false"
    :pagination="pagination"
    :data="tableData"
    :loading="isLoading"
    @page-change="handlePageChange"
  >
    <template #columns>
      <TableColumn title="id" data-index="id" />

      <TableColumn title="系统名称" data-index="systemname" />

      <TableColumn title="权限名称" data-index="authname" />
    </template>
  </Table>
</template>
