<script lang="ts" setup>
import { Result, Space, Button } from '@arco-design/web-vue';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const router = useRouter();

const handlePre = () => {
  emit('change-step', 0);
};

const handleDetail = () => {
  router.push({ name: 'ServiceList' });
};
</script>

<template>
  <div>
    <Result status="success" title="添加实例成功">
      <template #subtitle> 请在服务列表页面查看添加的服务实例 </template>
      <template #extra>
        <Space :size="16">
          <Button @click="handleDetail">查看详情</Button>
          <Button type="primary" @click="handlePre">再次创建</Button>
        </Space>
      </template>
    </Result>
  </div>
</template>
