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
  router.push({ name: 'VisitList' });
};
</script>

<template>
  <div>
    <Result status="success" title="申请成功">
      <template #subtitle> 请在服务访问申请列表页面查看 </template>
      <template #extra>
        <Space :size="16">
          <Button @click="handleDetail">查看详情</Button>
          <Button type="primary" @click="handlePre">再次删除</Button>
        </Space>
      </template>
    </Result>
  </div>
</template>
