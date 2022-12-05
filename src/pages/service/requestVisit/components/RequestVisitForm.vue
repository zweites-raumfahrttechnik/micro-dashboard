<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Spin, Form, FormItem, Input, Button, Select, Option } from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';

import { instance } from '@/api';
import { VISIT_URL } from '@/api/url';

import { useThemeList, useVisitedList } from './hooks';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const { themeLoadMore, themeLoading, theme } = useThemeList();
const { visitedLoadMore, visitedLoading, visited } = useVisitedList();

const formRef = ref<FormInstance>();

// 初始化表单初值
const formData = reactive<{ visitor?: string; visited?: string[]; name?: string }>({});

const { execute, isLoading } = useAxios(VISIT_URL, { method: 'POST' }, instance, {
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
      <FormItem field="name" label="申请的名称" :rules="[{ required: true, message: '必填' }]">
        <Input v-model="formData.name" placeholder="请输入申请的名称" />
      </FormItem>

      <FormItem
        field="visitor"
        label="发起访问的服务"
        :rules="[{ required: true, message: '必填' }]"
      >
        <Select
          v-model="formData.visitor"
          :loading="themeLoading"
          @dropdown-reach-bottom="themeLoadMore"
        >
          <Option v-for="item in theme" :key="item.uuid" :value="item.uuid">
            {{ item.name }}
          </Option>
        </Select>
      </FormItem>

      <FormItem field="visited" label="被访问的服务" :rules="[{ required: true, message: '必填' }]">
        <Select
          v-model="formData.visited"
          multiple
          :loading="visitedLoading"
          @dropdown-reach-bottom="visitedLoadMore"
        >
          <Option v-for="item in visited" :key="item.uuid" :value="item.uuid">
            {{ item.name }}
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
