<script setup lang="ts">
import { Card, Row, Col, Divider } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import { useTableProvideStore } from './hooks';

import ApproveSearchList from './components/ApproveSearchList.vue';
import ApproveListTable from './components/ApproveListTable.vue';

useTableProvideStore();
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>查询服务审批列表</template>

      <ApproveSearchList />

      <Divider style="margin-top: 0" />

      <Row>
        <Col :span="24">
          <ApproveListTable />
        </Col>
      </Row>
    </Card>
  </PageContainer>
</template>
