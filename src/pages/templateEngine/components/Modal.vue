<script setup lang="ts">
import { Table, TableColumn, Tag } from '@arco-design/web-vue';
import { reactive, ref } from 'vue';

import { useTableStore } from './hooks';
import { TemplateListItem } from '@/api/types';
const { tableData, handleSelect } = useTableStore()!;

const checkSelected = () => {};
</script>

<template>
  <Table row-key="templateName" :bordered="false" :data="tableData" @row-click="handleSelect">
    <template #columns>
      <TableColumn title="依赖" data-index="templateName" />
      <TableColumn title="状态" data-index="status">
        <template #cell="{record}">
          <Tag v-if="record.status==1" color="green" @check="checkSelected">未加载</Tag>
          <Tag v-else color="red" @check="checkSelected">已加载</Tag>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
