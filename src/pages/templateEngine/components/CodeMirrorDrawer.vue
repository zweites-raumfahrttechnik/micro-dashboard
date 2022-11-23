<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Drawer, Row, Col, Table, TableColumn, Popconfirm, Button } from '@arco-design/web-vue';

import { useDrawerStore } from './hooks';

const { drawerVisible } = useDrawerStore()!;

const handleDisableInstance = () => {
  drawerVisible.value = false;
};
</script>

<template>
  <Drawer
    placement="bottom"
    height="600px"
    :visible="drawerVisible"
    :footer="false"
    @cancel="handleDisableInstance"
  >
    <template #title>服务实例列表</template>
  </Drawer>
</template>
