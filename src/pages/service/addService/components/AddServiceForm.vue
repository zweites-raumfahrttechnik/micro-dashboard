<script lang="ts" setup>
import { Spin, Form, FormItem, Input, Button } from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';

import { instance } from '@/api';
import { THEME_URL } from '@/api/url';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const formRef = ref<FormInstance>();

// 初始化表单初值
const formData = reactive<{ name: string }>({
  name: '',
});

const { execute, isLoading } = useAxios(THEME_URL, { method: 'POST' }, instance, {
  immediate: false,
});

// 提交表单数据
const handleSubmit = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }

  execute({
    data: {
      ...formData,
    },
  }).then(item => {
    if (item.error.value) {
      return;
    }
    formRef.value?.resetFields();
    emit('change-step', 1);
  });
};
</script>

<template>
  <Spin :loading="isLoading">
    <Form ref="formRef" :model="formData" class="form" @submit="handleSubmit">
      <FormItem field="name" label="服务名称" :rules="[{ required: true, message: '必填' }]">
        <Input v-model="formData.name" placeholder="请输入服务名称" />
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
