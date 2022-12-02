<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Drawer,
  Input,
  InputPassword,
  Form,
  FormItem,
  Select,
  Option,
  Spin,
  Button,
  Row,
  Col,
} from '@arco-design/web-vue';

import { instance } from '@/api';
import { USER_URL } from '@/api/url';

import { useDrawerStore } from '../hooks';

const { drawerVisible, selectUser, UserInfoUpdateFormRef, isLoading, authData, selectLoadMore } =
  useDrawerStore()!;

const handleDisableInstance = () => {
  drawerVisible.value = false;
};

const { execute } = useAxios(USER_URL, { method: 'PUT' }, instance, {
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
      selectUser,
    },
  }).then(() => {
    UserInfoUpdateFormRef.value?.resetFields();
    drawerVisible.value = false;
  });
};
</script>

<template>
  <Drawer
    placement="bottom"
    height="80%"
    :visible="drawerVisible"
    :footer="false"
    @cancel="handleDisableInstance"
  >
    <template #title> 修改信息 </template>

    <Spin :loading="isLoading">
      <Form
        ref="UserInfoUpdateFormRef"
        v-model:model="selectUser"
        class="form"
        layout="horizontal"
        label-align="left"
        @submit="handleSubmit"
      >
        <Row>
          <Col :span="24">
            <FormItem field="uuid" label="uuid">
              <Input v-model="selectUser.uuid" size="large" disabled />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem field="nickname" label="昵称" :rules="[{ required: true, message: '必填' }]">
              <Input v-model="selectUser.nickname" size="large" />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem field="password" label="密码" :rules="[{ required: true, message: '必填' }]">
              <InputPassword v-model="selectUser.password" size="large" />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem field="auth" label="权限id" :rules="[{ required: true, message: '必填' }]">
              <Select
                v-model="selectUser.auth"
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
          </Col>
          <Col :span="24">
            <FormItem>
              <Button html-type="submit" type="primary">提交</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Spin>
  </Drawer>
</template>

<style lang="less" scoped>
.form {
  width: 1000px;
  margin-left: 45%;
}
</style>
