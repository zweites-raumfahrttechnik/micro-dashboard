<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition appear name="fade" mode="out-in">
      <component :is="Component" v-if="route.meta.ignoreCache" :key="route.fullPath" />

      <KeepAlive v-else>
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<!-- <style lang="less" scoped></style> -->
