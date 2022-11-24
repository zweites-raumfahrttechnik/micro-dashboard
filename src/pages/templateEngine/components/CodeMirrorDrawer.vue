<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Drawer, Row, Col, Table, TableColumn, Popconfirm, Button } from '@arco-design/web-vue';

import { instance } from '@/api';
import { THEME_INSTANCE_URL } from '@/api/url';

import { useTableStore, useDrawerStore } from './hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { tableData } = useTableStore()!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { drawerVisible } = useDrawerStore()!;

const handleCancel = () => {
  //drawerVisible.value = false;
};
</script>

<template>
  <Drawer
    placement="bottom"
    height="600px"
    :visible="drawerVisible"
    :footer="false"
    @cancel="handleCancel"
  >
  </Drawer>
</template>
