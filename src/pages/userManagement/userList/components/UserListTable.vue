<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Table, TableColumn, Space, Button, Popconfirm, Link } from '@arco-design/web-vue';

import { instance } from '@/api';
import { USER_URL } from '@/api/url';

import { useTableStore, useInfoUpdateDrawerStore, useInfoDrawerStore } from '../hooks';

const { pagination, tableData, isLoading, refreshList } = useTableStore()!;
const { useInfoUpdateDrawerVisible, selectUser } = useInfoUpdateDrawerStore()!;
const { useInfoDrawVisible, selectUuid } = useInfoDrawerStore()!;

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
  useInfoUpdateDrawerVisible.value = true;

  selectUser.nickname = record.nickname;
  selectUser.uuid = record.uuid;
};
const handShowPermissions = (uuid: any) => {
  useInfoDrawVisible.value = true;
  selectUuid.value = uuid;
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
      <TableColumn title="用户名">
        <template #cell="{ record }">
          <Link @click="() => handShowPermissions(record.uuid)">{{ record.username }}</Link>
        </template>
      </TableColumn>

      <TableColumn title="昵称" data-index="nickname" />

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
