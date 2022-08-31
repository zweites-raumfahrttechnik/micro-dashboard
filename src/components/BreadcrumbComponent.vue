<script lang="ts" setup>
import { Breadcrumb, BreadcrumbItem } from '@arco-design/web-vue';
import { IconApps } from '@arco-design/web-vue/es/icon';

const props = defineProps<{ items?: string[] }>();

const route = useRoute();

const breadcrumbs = computed(() => {
  if (props.items !== undefined) {
    return props.items;
  }

  return route.matched
    .map(item => (item.meta.locale ? item.meta.locale : ''))
    .filter(item => item != '');
});
</script>

<template>
  <Breadcrumb class="breadcrumb">
    <BreadcrumbItem>
      <IconApps />
    </BreadcrumbItem>

    <BreadcrumbItem v-for="item in breadcrumbs" :key="item">{{ item }}</BreadcrumbItem>
  </Breadcrumb>
</template>

<style lang="less" scoped>
.breadcrumb {
  margin: 16px 0;

  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));

    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
</style>
