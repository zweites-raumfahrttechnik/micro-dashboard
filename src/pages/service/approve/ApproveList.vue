<script setup lang="ts">
import { Card, Row, Col, Divider } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import { useTableProvideStore } from './hooks';

import ServiceSearchList from './components/ServiceSearchList.vue';
import ServiceListTable from './components/ServiceListTable.vue';

useTableProvideStore();
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>查询服务审批列表</template>

      <ServiceSearchList />

      <Divider style="margin-top: 0" />

      <Row>
        <Col :span="24">
          <ServiceListTable />
        </Col>
      </Row>
    </Card>
  </PageContainer>
</template>
