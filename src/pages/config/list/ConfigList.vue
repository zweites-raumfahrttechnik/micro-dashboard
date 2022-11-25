<script setup lang="ts">
import { Card, Row, Col, Divider } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';
import {
  useTableProvideStore,
  useDrawerProvideStore,
  useModifyConfigModalProvideStore,
} from './hooks';
import ConfigSearchList from './components/ConfigSearchList.vue';
import ConfigListTable from './components/ConfigListTable.vue';

useTableProvideStore();
useDrawerProvideStore();
useModifyConfigModalProvideStore();
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>查询服务列表</template>

      <ConfigSearchList />

      <Divider style="margin-top: 0" />

      <Row>
        <Col :span="24">
          <ConfigListTable />
        </Col>
      </Row>
    </Card>
  </PageContainer>
</template>
