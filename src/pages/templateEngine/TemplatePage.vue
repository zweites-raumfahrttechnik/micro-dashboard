<script setup lang="ts">
import { Card } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';
import LeftBox from './components/EngineForm.vue';
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>模板引擎</template>

      <div class="wrap">
        <LeftBox />
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
