<script setup lang="ts">
import { Card, Row, Col, Divider } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import {
  useTableProvideStore,
  useInfoUpdateDrawerProvideStore,
  useInfoDrawerProvideStore,
} from './hooks';

import UserSearchList from './components/UserSearchList.vue';
import UserListTable from './components/UserListTable.vue';
import UserInfoUpdateDrawer from './components/UserInfoUpdateDrawer.vue';
import UserInfoDrawer from './components/UserInfoDrawer.vue';

useTableProvideStore();
useInfoUpdateDrawerProvideStore();
useInfoDrawerProvideStore();
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>获取用户列表</template>

      <UserSearchList />

      <Divider style="margin-top: 0" />

      <Row>
        <Col :span="24">
          <UserListTable />
        </Col>
      </Row>
    </Card>

    <UserInfoUpdateDrawer />
    <UserInfoDrawer />
  </PageContainer>
</template>
