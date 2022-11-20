<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Spin, Form, FormItem, Button, Select, Option } from '@arco-design/web-vue';

import { instance } from '@/api';
import { VISIT_URL } from '@/api/url';

import { useTableStore } from './hooks';
const {
  DelServiceAccessFormRef,
  DelServiceAccessFormData,
  isLoading: listLoading,
  tableData,
  selectLoadMore,
} = useTableStore()!;

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const { execute, isLoading } = useAxios(VISIT_URL, { method: 'DELETE' }, instance, {
  immediate: false,
});

// 提交表单数据
const handleSubmit = async () => {
  const res = await DelServiceAccessFormRef.value?.validate();
  if (res) {
    return;
  }

  execute({
    data: { visitor: DelServiceAccessFormData.visitor, visited: DelServiceAccessFormData.visited },
  }).then(() => {
    DelServiceAccessFormRef.value?.resetFields();

    emit('change-step', 1);
  });
};
</script>

<template>
  <Spin :loading="isLoading">
    <Form
      ref="DelServiceAccessFormRef"
      class="form"
      :model="DelServiceAccessFormData"
      @submit="handleSubmit"
    >
      <FormItem field="visitor" label="申请删除服务" :rules="[{ required: true, message: '必填' }]">
        <Select
          v-model="DelServiceAccessFormData.visitor"
          :loading="listLoading"
          placeholder="请选择..."
          allow-clear
          :scrollbar="true"
          @dropdown-reach-bottom="selectLoadMore"
        >
          <Option v-for="item in tableData" :key="item.visitor.name" :value="item.visitor.name">
            {{ item.visitor.name }}
          </Option>
        </Select>
      </FormItem>

      <FormItem
        field="visited"
        label="申请被删除服务"
        :rules="[{ required: true, message: '必填' }]"
      >
        <Select
          v-model="DelServiceAccessFormData.visited"
          :loading="listLoading"
          placeholder="请选择..."
          multiple
          :max-tag-count="10"
          allow-clear
          :scrollbar="true"
          @dropdown-reach-bottom="selectLoadMore"
        >
          <Option v-for="item in tableData" :key="item.visitor.name" :value="item.visitor.name">
            {{ item.visitor.name }}
          </Option>
        </Select>
      </FormItem>

      <FormItem>
        <Button html-type="submit" type="primary">提交</Button>
      </FormItem>
    </Form>
  </Spin>
</template>

<style lang="less" scoped>
.form {
  width: 700px;
}
</style>
