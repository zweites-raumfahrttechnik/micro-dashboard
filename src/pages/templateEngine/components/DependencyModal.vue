<script setup lang="ts">
import { Table, TableColumn } from '@arco-design/web-vue';

import { useTableStore } from '../hooks';

const { tableData, selectedKeys, isLoading } = useTableStore()!;

const rowSelection = {
  checkbos: true,
  showCheckedAll: true,
  onlyCurrent: false,
};
</script>

<template>
  <Table
    v-model:selectedKeys="selectedKeys"
    row-key="templateName"
    :hoverable="true"
    :row-selection="rowSelection"
    :loading="isLoading"
    :bordered="false"
    :data="tableData"
  >
    <template #columns>
      <TableColumn title="依赖" data-index="templateName" />
    </template>
  </Table>
</template>
