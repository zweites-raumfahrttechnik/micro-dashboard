<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Modal, Form, Select, Input, FormItem, Option } from '@arco-design/web-vue';

import { instance } from '@/api';
import { VISIT_APPROVE_URL } from '@/api/url';

import { useTableStore, useModalStore } from './hooks';

const { refreshList } = useTableStore()!;
const { modalVisible, approveForm, approveFormRef } = useModalStore()!;

const handleDisableInstance = () => {
  modalVisible.value = false;
};

const { execute: approveExecute } = useAxios(
  VISIT_APPROVE_URL,
  {
    method: 'POST',
  },
  instance,
  { immediate: false },
);

const handleBeforeOk = async (uuid: string, statusString: string, message: string) => {
  approveFormRef.value?.resetFields();

  const status = parseInt(statusString);

  await approveExecute({ data: { uuid, status, message } });

  handleDisableInstance();

  refreshList();
};
</script>

<template>
  <Modal
    v-model:visible="modalVisible"
    @ok="
      handleBeforeOk(
        approveForm.selectService,
        approveForm.approveState,
        approveForm.approveMessage,
      )
    "
  >
    <template #title> 审批详情 </template>
    <Form ref="approveFormRef" v-model:model="approveForm">
      <FormItem field="approveState" label="服务申请状态">
        <Select v-model="approveForm.approveState" placeholder="请选择服务申请状态">
          <Option value="2">批准</Option>
          <Option value="3">拒绝</Option>
        </Select>
      </FormItem>
      <FormItem field="approveMessage" label="相关信息">
        <Input v-model="approveForm.approveMessage" placeholder="请输入相关信息"> </Input>
      </FormItem>
    </Form>
  </Modal>
</template>
