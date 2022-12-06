<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Table, TableColumn, Space, Button, Popconfirm } from '@arco-design/web-vue';
import { instance } from '@/api';
import { CONFIG_URL } from '@/api/url';
import { useTableStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { pagination, tableData, isLoading, refreshList } = useTableStore()!;

const { isLoading: deleteIsLoading, execute: execute } = useAxios(
  CONFIG_URL,
  {
    method: 'DELETE',
  },
  instance,
  { immediate: false },
);

// 更新分页参数, 触发请求
const handlePageChange = (page: number) => {
  pagination.current = page;
};

const handleDeleteConfig = async (uuid: string) => {
  await execute({ data: { uuid } });
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
      <TableColumn title="类型">
        <template #cell="{ record }">
          <span v-if="record.type === 1">公有配置</span>
          <span v-else-if="record.type === 2">私有配置</span>
        </template>
      </TableColumn>
      <TableColumn title="操作">
        <template #cell="{ record }">
          <Space>
            <Popconfirm content="请确认是否删除此配置" @ok="() => handleDeleteConfig(record.uuid)">
              <Button type="text" status="danger">删除</Button>
            </Popconfirm>
          </Space>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
