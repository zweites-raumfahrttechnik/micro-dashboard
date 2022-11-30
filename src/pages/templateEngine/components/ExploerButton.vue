<script setup lang="ts">
import { Button, Space } from '@arco-design/web-vue';

import { useDrawerStore } from '../hooks';
const { drawerVisible } = useDrawerStore()!;

const handleShowCodeMirrorDrawer = () => {
  drawerVisible.value = true;
};

const handleDownload = () => {
  alert('下载文件');
};
</script>

<template>
  <Space class="footer">
    <Button
      type="primary"
      status="normal"
      shape="square"
      size="large"
      @click="handleShowCodeMirrorDrawer()"
    >
      查看代码详情
    </Button>
    <Button type="primary" status="normal" shape="square" size="large" @click="handleDownload">
      下载
    </Button>
  </Space>
</template>
