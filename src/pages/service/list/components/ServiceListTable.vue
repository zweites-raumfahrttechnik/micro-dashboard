<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Table, TableColumn, Space, Button, Popconfirm } from '@arco-design/web-vue';

import { instance } from '@/api';
import { THEME_URL } from '@/api/url';

import { useTableStore, useDrawerStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { pagination, tableData, isLoading, refreshList } = useTableStore()!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { drawerVisible, selectService } = useDrawerStore()!;

const { isLoading: deleteIsLoading, execute: execute } = useAxios(
  THEME_URL,
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

const handleDeleteService = async (uuid: string) => {
  await execute({ data: { uuids: [uuid] } });

  refreshList();
};

const handleShowInstance = (uuid: string) => {
  drawerVisible.value = true;
  selectService.value = uuid;
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
      <TableColumn title="服务名称" data-index="name" />

      <TableColumn title="创建者">
        <template #cell="{ record }">
          {{ record.user.nickName }}
        </template>
      </TableColumn>

      <TableColumn title="创建时间" data-index="createAt" />

      <TableColumn title="操作">
        <template #cell="{ record }">
          <Space>
            <Button type="text" status="normal" @click="() => handleShowInstance(record.uuid)">
              详情
            </Button>

            <Popconfirm
              content="请确认是否删除此数据库连接"
              @ok="() => handleDeleteService(record.uuid)"
            >
              <Button type="text" status="danger">删除</Button>
            </Popconfirm>
          </Space>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
