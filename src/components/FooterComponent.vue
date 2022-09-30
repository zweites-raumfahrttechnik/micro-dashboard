<script lang="ts" setup>
import { useAppModel } from '@/model';
import { LayoutFooter } from '@arco-design/web-vue';

const { state } = useAppModel();
</script>

<template>
  <LayoutFooter class="footer">{{ state.title }}</LayoutFooter>
</template>

<style lang="less" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: var(--color-text-2);
  text-align: center;
}
</style>
