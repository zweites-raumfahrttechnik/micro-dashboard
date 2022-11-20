<script setup lang="ts">
import {
  Table,
  TableColumn,
  Tag,
  Modal,
  Button,
  Select,
  Option,
  Input,
  Row,
  Col,
  Space,
  Form,
} from '@arco-design/web-vue';

import { useTableStore, useModalStore } from './hooks';

import ApproveModal from './ServiceAccessApproveModal.vue';

const { pagination, tableData, isLoading, refreshList } = useTableStore()!;

const { modalVisible, approveForm } = useModalStore()!;

// 更新分页参数, 触发请求
const handlePageChange = (page: number) => {
  pagination.current = page;
};

const handleShowInstance = (uuid: string) => {
  modalVisible.value = true;

  approveForm.selectService = uuid;
};
</script>

<template>
  <ApproveModal v-if="modalVisible"></ApproveModal>

  <Table
    row-key="uuid"
    :bordered="false"
    :pagination="pagination"
    :data="tableData"
    :loading="isLoading"
    @page-change="handlePageChange"
  >
    <template #columns>
      <TableColumn title="申请记录">
        <template #cell="{ record }">
          {{ record.name }}
        </template>
      </TableColumn>

      <TableColumn title="申请时间">
        <template #cell="{ record }">
          {{ record.createAt }}
        </template>
      </TableColumn>

      <TableColumn title="创建者">
        <template #cell="{ record }">
          {{ record.user.nickName }}
        </template>
      </TableColumn>

      <TableColumn title="申请服务">
        <template #cell="{ record }">
          {{ record.visitor.name }}
        </template>
      </TableColumn>

      <TableColumn title="审批状态">
        <template #cell="{ record }">
          <Tag v-if="record.status === 1">待批准</Tag>
          <Tag v-else-if="record.status === 2" color="green">已批准</Tag>
          <Tag v-else color="red">已拒绝</Tag>
        </template>
      </TableColumn>

      <TableColumn title="操作">
        <template #cell="{ record }">
          <Button
            :disabled="record.status !== 1"
            type="text"
            @click="() => handleShowInstance(record.uuid)"
            >审批
          </Button>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
