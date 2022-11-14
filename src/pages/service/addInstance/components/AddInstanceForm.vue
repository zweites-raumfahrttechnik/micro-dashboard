<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Spin,
  Form,
  FormItem,
  Input,
  Button,
  InputNumber,
  Select,
  Option,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';

import { instance } from '@/api';
import { THEME_INSTANCE_URL } from '@/api/url';

import { useThemeList } from './hooks';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const { selectLoadMore, isLoading: listLoading, theme } = useThemeList();

const formRef = ref<FormInstance>();

// 初始化表单初值
const formData = reactive<{ uuid: string; ip: string; port?: number }>({
  uuid: '',
  ip: '',
});

const { execute, isLoading } = useAxios(THEME_INSTANCE_URL, { method: 'POST' }, instance, {
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
  }).then(() => {
    formRef.value?.resetFields();
    emit('change-step', 1);
  });
};
</script>

<template>
  <Spin :loading="isLoading">
    <Form ref="formRef" :model="formData" class="form" @submit="handleSubmit">
      <FormItem field="uuid" label="实例IP地址" :rules="[{ required: true, message: '必填' }]">
        <Select
          v-model="formData.uuid"
          :loading="listLoading"
          @dropdown-reach-bottom="selectLoadMore"
        >
          <Option v-for="item in theme" :key="item.uuid" :value="item.uuid">
            {{ item.name }}
          </Option>
        </Select>
      </FormItem>

      <FormItem
        field="ip"
        label="实例IP地址"
        :rules="[
          { required: true, message: '必填' },
          {
            match:
              /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/,
            message: 'IP地址格式不正确',
          },
        ]"
      >
        <Input v-model="formData.ip" placeholder="请输入实例IP地址" />
      </FormItem>

      <FormItem field="port" label="实例运行端口" :rules="[{ required: true, message: '必填' }]">
        <InputNumber v-model="formData.port" placeholder="请输入实例运行端口" />
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
