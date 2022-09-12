<script lang="ts" setup>
import { Result, Space, Button } from '@arco-design/web-vue';

const router = useRouter();

const handleBack = () => {
  router.replace({ name: 'Welcome' });
};
</script>

<template>
  <div class="container">
    <Result status="404" subtitle="页面未找到">
      <template #extra>
        <Space>
          <Button type="primary" @click="handleBack">返回</Button>
        </Space>
      </template>
    </Result>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
}
</style>
