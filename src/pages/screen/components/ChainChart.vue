<script lang="ts" setup>
import { Row, Col } from '@arco-design/web-vue';

import { CPU_CHART_URL, MEMORY_CHART_URL, BANDWIDTH_CHART_URL } from '@/api/url';

import ChainItem from './ChainChartItem.vue';

const props = defineProps<{ uuid: string }>();
</script>

<template>
  <Row :gutter="16">
    <Col :span="8">
      <ChainItem title="CPU占用情况" :url="CPU_CHART_URL" :uuid="props.uuid" chart-type="line" />
    </Col>

    <Col :span="8">
      <ChainItem title="内存占用情况" :url="MEMORY_CHART_URL" :uuid="props.uuid" chart-type="bar" />
    </Col>

    <Col :span="8">
      <ChainItem title="带宽使用情况" :url="BANDWIDTH_CHART_URL" :uuid="props.uuid" chart-type="line" />
    </Col>
  </Row>
</template>
