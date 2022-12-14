<script lang="ts" setup>
import { Spin, Form, FormItem, Input, Button, Select, Option } from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';

import { instance } from '@/api';
import { CONFIG_URL } from '@/api/url';

const extensions = [json()];

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const formRef = ref<FormInstance>();

// 初始化表单初值
const formData = reactive<{ dataID: string; content: string; type?: number }>({
  dataID: '',
  content: '',
});

const { execute, isLoading } = useAxios(CONFIG_URL, { method: 'POST' }, instance, {
  immediate: false,
});

// 提交表单数据
const handleSubmit = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }
  formData.content = JSON.stringify(formData.content);
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
      <FormItem field="dataID" label="配置文件名" :rules="[{ required: true, message: '必填' }]">
        <Input v-model="formData.dataID" placeholder="请输入配置文件名" />
      </FormItem>
      <FormItem field="content" label="配置内容" :rules="[{ required: true, message: '必填' }]">
        <Codemirror
          v-model="formData.content"
          :style="{ width: '100%', height: '360px', background: '#D4D4D4' }"
          placeholder="请在此处输入配置内容（Json）..."
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
        />
      </FormItem>
      <FormItem field="type" label="类型" :rules="[{ required: true, message: '必填' }]">
        <Select v-model="formData.type" placeholder="请选择配置类型">
          <Option :value="1">公有配置</Option>
          <Option :value="2">私有配置</Option>
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
