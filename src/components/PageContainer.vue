<script lang="ts" setup>
import Breadcrumb from './BreadcrumbComponent.vue';

const props = defineProps<{ items?: string[] }>();
</script>

<template>
  <div class="container">
    <Breadcrumb :items="props.items" />
    <slot />
  </div>
</template>

<style lang="less" scoped>
.container {
  padding: 0 20px 20px;
}
</style>
