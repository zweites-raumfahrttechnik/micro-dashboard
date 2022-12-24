<script setup lang="ts">
import { Table, TableColumn, Tag } from '@arco-design/web-vue';
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
      <TableColumn title="uuid" data-index="uuid" />

      <TableColumn title="系统名称" data-index="system" />

      <TableColumn title="权限">
        <template #cell="{ record }">
          <Tag v-if="record.auth === 0" color="green"><span>普通用户</span></Tag>
          <Tag v-else-if="record?.auth === 1" color="red"><span>管理员</span></Tag>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
