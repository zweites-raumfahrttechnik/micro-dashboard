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
  router.push({ name: 'ConfigList' });
};
</script>

<template>
  <div>
    <Result status="success" title="发布配置成功">
      <template #subtitle> 请在配置列表页面查看发布的配置信息 </template>
      <template #extra>
        <Space :size="16">
          <Button @click="handleDetail">查看详情</Button>
          <Button type="primary" @click="handlePre">再次发布</Button>
        </Space>
      </template>
    </Result>
  </div>
</template>
