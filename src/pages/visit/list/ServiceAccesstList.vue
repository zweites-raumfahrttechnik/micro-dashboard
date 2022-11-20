<script setup lang="ts">
import { Card, Row, Col, Divider } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import { useTableProvideStore, useModalProvideStore } from './components/hooks';

import ServiceSearchList from './components/ServiceAccessSearchList.vue';
import ServiceListTable from './components/ServiceAccessListTable.vue';

useTableProvideStore();
useModalProvideStore();
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>获取服务访问申请列表</template>

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
