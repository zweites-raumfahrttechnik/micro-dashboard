<script setup lang="ts">
import {
  Card,
  Row,
  Col,
  Divider,
  Tabs,
  TabPane,
  Result,
  CardMeta,
  TypographyText,
  Tag,
  Button,
  Descriptions,
  Popconfirm,
  Pagination,
  InputSearch,
} from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';
import LeftBox from './components/LeftBox.vue';
import RightBox from './components/RightBox.vue';

import { useTableProvideStore } from './components/hooks';

useTableProvideStore();
useDrawerProvideStore();

</script>

<template>
  <PageContainer>
    <Card class="general-card card-container" :bordered="false">
      <template #title>模板引擎</template>
      <Row :gutter="12">
        <Col class="col-height" :span="12">
          <LeftBox />
        </Col>

        <Col class="col-height line-center" :span="1">
          <Divider direction="vertical" :style="{ height: '100%' }" />
        </Col>

        <Col class="col-height" :span="10">
          <RightBox />
        </Col>
      </Row>
    </Card>
  </PageContainer>
  
</template>
<style lang="less" scoped>
.card-container {
  height: 100%;
  flex: 1;

  .col-height {
    height: 750px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #ecf0f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #bdc3c7;
    }
  }

  .line-center {
    display: flex;
    justify-content: center;
  }

  :deep(.arco-card-body) {
    position: relative;
  }
}
</style>
