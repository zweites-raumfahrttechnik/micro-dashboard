<script setup lang="ts">
import { instance } from '@/api';
import { CONFIG_URL } from '@/api/url';
import { Form, FormItem, Input, Modal, Select, Option } from '@arco-design/web-vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useTableStore, useModifyConfigModalStore } from '../hooks';

const { refreshList } = useTableStore()!;

const { modifyModalVisible, ModifyForm } = useModifyConfigModalStore()!;

const { execute: modifyExecute } = useAxios(
  CONFIG_URL,
  {
    method: 'POST',
  },
  instance,
  { immediate: false },
);

const handleBeforeOk = async (dataID: string, content: string, type: number) => {
  await modifyExecute({ data: { dataID, content, type } });
  modifyModalVisible.value = false;
  refreshList();
};
</script>
<template>
  <Modal ok-text="修改并发布" v-model:visible="modifyModalVisible"
    @ok="handleBeforeOk(ModifyForm.dataId, ModifyForm.content, parseInt(ModifyForm.type))">
    <template #title>
      修改配置
    </template>
    <Form v-model:model="ModifyForm">
      <FormItem field="dataID" label="配置属性">
        <Input v-model="ModifyForm.dataId" />
      </FormItem>
      <FormItem field="content" label="配置内容">
        <Input v-model="ModifyForm.content" />
      </FormItem>
      <FormItem field="type" label="类型">
        <Select v-model="ModifyForm.type">
          <Option value="1">配置一</Option>
          <Option value="2">配置二</Option>
          <Option value="3">配置三</Option>
          <Option value="4">配置四</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>