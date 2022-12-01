<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Form,
  FormItem,
  Input,
  InputPassword,
  Space,
  Button,
  Checkbox,
} from '@arco-design/web-vue';
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';
import { instance, ResponseWrap } from '@/api';
import { LOGIN_URL } from '@/api/url';
import { useAppModel, useUserModel } from '@/model';

interface LoginResponse {
  token: string;
  role: number;
}

const router = useRouter();

const {
  state: { title },
} = useAppModel();

const { setUser } = useUserModel();

const { execute } = useAxios<ResponseWrap<LoginResponse>>(LOGIN_URL, { method: 'POST' }, instance, {
  immediate: false,
});

const userInfo = reactive({
  username: '',
  password: '',
});

const handleLogin = () => {
  execute({
    data: {
      username: userInfo.username,
      password: userInfo.password,
      system: 'MicroService',
    },
  }).then(item => {
    if (item.error.value || !item.data.value) {
      return;
    }

    const { token, role } = item.data.value.data as LoginResponse;

    setUser(token, role === 1 ? 'admin' : 'user');
    router.replace({ name: 'Overview' });
  });
};
</script>

<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">登录 {{ title }}</div>
    <div class="login-form-sub-title">登录 {{ title }}</div>
    <div class="login-form-error-msg"></div>

    <Form :model="userInfo" layout="vertical" @submit="handleLogin">
      <FormItem
        field="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <Input v-model="userInfo.username" placeholder="请输入用户名">
          <template #prefix>
            <IconUser />
          </template>
        </Input>
      </FormItem>
      <FormItem
        field="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <InputPassword v-model="userInfo.password" placeholder="请输入密码" allow-clear>
          <template #prefix>
            <IconLock />
          </template>
        </InputPassword>
      </FormItem>

      <Space :size="16" direction="vertical">
        <div>
          <Checkbox>记住密码</Checkbox>
        </div>
        <Button type="primary" html-type="submit" long>登录</Button>
      </Space>
    </Form>
  </div>
</template>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }
}
</style>
