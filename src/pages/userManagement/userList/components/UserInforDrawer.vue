<script setup lang="ts">
import { Drawer, Row, Col, Tag, List, ListItem } from '@arco-design/web-vue';

import { useInfoDrawerStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { useInfoDrawVisible, isLoading, userAuthData } = useInfoDrawerStore()!;

const handleDisableInstance = () => {
  useInfoDrawVisible.value = false;
};
</script>

<template>
  <Drawer
    placement="right"
    width="400px"
    :visible="useInfoDrawVisible"
    :footer="false"
    @cancel="handleDisableInstance"
  >
    <template #title>用户权限</template>
    <Row justify="center">
      <Col :span="20">
        <template #header> 用户权限 </template>
        <List :loading="isLoading">
          <ListItem>系统名称：{{ userAuthData?.system }}</ListItem>
          <ListItem>
            <Tag v-if="userAuthData?.role === 0" color="green"><span>普通用户</span></Tag>
            <Tag v-else-if="userAuthData?.role === 1" color="red"><span>管理员</span></Tag>
          </ListItem>
        </List>
      </Col>
    </Row>
  </Drawer>
</template>
