<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Drawer,
  Row,
  Col,
  Table,
  TableColumn,
  Popconfirm,
  Button,
  Card,
  Divider,
  List,
  ListItem,
} from '@arco-design/web-vue';

import { useDrawerStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { userdrawVisible, selectUser, authData } = useDrawerStore()!;

const handleDisableInstance = () => {
  userdrawVisible.value = false;
};
</script>

<template>
  <Drawer
    placement="right"
    width="400px"
    :visible="userdrawVisible"
    :footer="false"
    @cancel="handleDisableInstance"
  >
    <template #title>用户权限</template>
    <Row justify="center">
      <Col :span="20">
        <List :data="selectUser.auth">
          <ListItem v-for="item in selectUser.auth" :value="item">{{ item }}</ListItem>
        </List>
      </Col>
    </Row>
  </Drawer>
</template>
