<script lang="ts" setup>
import { Spin, Form, FormItem, Input, Button } from '@arco-design/web-vue';

import { useTableStore } from '../hooks';

const { searchFormRef, searchFormData, isLoading, execute } = useTableStore()!;

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const getInfo = () => {
  const params = { system: '' };

  if (searchFormData.systemname && searchFormData.systemname !== '') {
    params.system = searchFormData.systemname;
  }
  execute({ params }).then(() => {
    searchFormRef.value?.resetFields();
    emit('change-step', 1);
  });
};
</script>

<template>
  <Spin :loading="isLoading">
    <Form ref="searchFormRef" :model="searchFormData" class="form" @submit="getInfo">
      <FormItem field="systemname" label="系统名称" :rules="[{ required: true, message: '必填' }]">
        <Input v-model="searchFormData.systemname" placeholder="请输入系统名称" />
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
