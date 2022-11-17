<script setup lang="ts">
import { Card, Row, Col, Divider } from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { useTableProvideStore } from './hooks';
import ConfigSearchList from './components/ApproveSearchList.vue';
import ConfigListTable from './components/ApproveListTable.vue';

useTableProvideStore();
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>查询配置审批列表</template>

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
