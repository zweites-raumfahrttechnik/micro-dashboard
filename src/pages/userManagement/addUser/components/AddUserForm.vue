<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Spin,
  Form,
  FormItem,
  Input,
  InputPassword,
  Button,
  Select,
  Option,
} from '@arco-design/web-vue';

import { instance } from '@/api';
import { USER_URL } from '@/api/url';

import { useFormStore } from '../hooks';

import { AddUserInfo } from '../types';
const { isLoading, authData, UserInfoUpdateFormRef, selectLoadMore } = useFormStore()!;

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

// 初始化表单初值
const formData = reactive<AddUserInfo>({});

const { execute, isLoading: postloading } = useAxios(USER_URL, { method: 'POST' }, instance, {
  immediate: false,
});

// 提交表单数据
const handleSubmit = async () => {
  const res = await UserInfoUpdateFormRef.value?.validate();
  if (res) {
    return;
  }

  execute({
    data: {
      ...formData,
    },
  }).then(() => {
    UserInfoUpdateFormRef.value?.resetFields();
    emit('change-step', 1);
  });
};
</script>

<template>
  <Spin :loading="postloading">
    <Form ref="UserInfoUpdateFormRef" :model="formData" class="form" @submit="handleSubmit">
      <FormItem field="username" label="用户名" :rules="[{ required: true, message: '必填' }]">
        <Input v-model="formData.username" placeholder="请输入用户名" />
      </FormItem>

      <FormItem field="password" label="密码" :rules="[{ required: true, message: '必填' }]">
        <InputPassword v-model="formData.password" placeholder="请输入密码" />
      </FormItem>

      <FormItem field="auth" label="权限id" :rules="[{ required: true, message: '必填' }]">
        <Select
          v-model="formData.auth"
          :loading="isLoading"
          placeholder="请选择..."
          multiple
          :max-tag-count="10"
          allow-clear
          :scrollbar="true"
          size="large"
          @dropdown-reach-bottom="selectLoadMore"
        >
          <Option v-for="item in authData" :key="item.id" :value="item.id">
            {{ item.id }}
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
