<script setup lang="ts">
import { Card, Row, Col, Divider } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import { useTableProvideStore } from './hooks';

import AuthSearchList from './components/AuthSearchList.vue';
import AuthListTable from './components/AuthListTable.vue';

useTableProvideStore();
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>获取权限列表</template>

      <AuthSearchList />

      <Divider style="margin-top: 0" />

      <Row>
        <Col :span="24">
          <AuthListTable />
        </Col>
      </Row>
    </Card>
  </PageContainer>
</template>
