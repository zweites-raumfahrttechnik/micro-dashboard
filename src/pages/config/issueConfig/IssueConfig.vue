<script setup lang="ts">
import { Card } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import IssueConfigForm from './components/IssueConfigForm.vue';
import IssueConfigSuccess from './components/IssueConfigSuccess.vue';

// 标记当前应展示的表单页面
const step = ref(0);

const changeStep = (idx: number) => {
  step.value = idx;
};
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>发布配置</template>
      <div class="wrap">
        <KeepAlive>
          <IssueConfigForm v-if="step === 0" @change-step="changeStep" />
          <IssueConfigSuccess v-else-if="step === 1" @change-step="changeStep" />
        </KeepAlive>
      </div>
    </Card>
  </PageContainer>
</template>

<style lang="less" scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 0;
}
</style>
