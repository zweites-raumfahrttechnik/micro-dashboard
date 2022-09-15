<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { useTabModel } from '@/model';

const { cacheList } = useTabModel();
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition appear name="fade" mode="out-in">
      <component :is="Component" v-if="route.meta.ignoreCache" :key="route.fullPath" />

      <KeepAlive v-else :include="cacheList">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
