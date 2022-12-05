<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Table, TableColumn, Space, Button, Popconfirm } from '@arco-design/web-vue';

import { instance } from '@/api';
import { USER_URL } from '@/api/url';

import { useTableStore, useDrawerStore } from '../hooks';

const { pagination, tableData, isLoading, refreshList } = useTableStore()!;
const { drawerVisible, selectUser } = useDrawerStore()!;

const { isLoading: deleteIsLoading, execute: execute } = useAxios(
  USER_URL,
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

const handleDeleteUser = async (uuid: string) => {
  await execute({ data: { uuid } });

  refreshList();
};

const handleShowUserInfoUpdateDrawer = (record: any) => {
  drawerVisible.value = true;

  selectUser.nickname = record.nickname;
  selectUser.uuid = record.uuid;
  selectUser.auth = record.authid;
  selectUser.password = '';
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
      <TableColumn title="用户名" data-index="username" />

      <TableColumn title="昵称" data-index="nickname" />

      <TableColumn title="权限id" data-index="authid" />

      <TableColumn title="操作">
        <template #cell="{ record }">
          <Space>
            <Popconfirm content="请确认是否删除用户" @ok="() => handleDeleteUser(record.uuid)">
              <Button type="text" status="danger">删除</Button>
            </Popconfirm>
          </Space>
          <Space>
            <Button type="text" status="normal" @click="handleShowUserInfoUpdateDrawer(record)"
              >修改</Button
            >
          </Space>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
