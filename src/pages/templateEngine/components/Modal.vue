<script setup lang="ts">
import { Table, TableColumn, Tag } from '@arco-design/web-vue';
import { reactive, ref } from 'vue';

import { useTableStore } from './hooks';
import { TemplateListItem } from '@/api/types';
const { tableData, ListData, handleSelect } = useTableStore()!;
</script>

<template>
  <Table row-key="templateName" :bordered="false" :data="tableData" @row-click="handleSelect">
    <template #columns>
      <TableColumn title="依赖" data-index="templateName" />
      <TableColumn title="状态">
        <template #cell>
          <Tag checkable color="green">已加载</Tag>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
