<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Row, Col, Card, Statistic } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { POOL_CHART_URL, STORAGE_CHART_URL } from '@/api/url';

import ChainChartItem from './ChainChartItem.vue';

const props = defineProps<{ uuid: string }>();

const { data, execute } = useAxios<ResponseWrap<number>>(
  STORAGE_CHART_URL,
  { params: { uuid: props.uuid } },
  instance,
);


watch(
  () => props.uuid,
  () => execute({ params: { uuid: props.uuid } }),
);

const storage = computed(() => {
  if (!data.value?.data) {
    return 0;
  }

  return data.value.data;
});
</script>

<template>
  <Row :gutter="16">
    <Col :span="12">
      <Card class="general-card" :bordered="false">
        <template #title>硬盘占用情况</template>

        <div class="content">
          <Statistic title="硬盘占用情况" :value="storage" :precision="2">
            <template #suffix>GB</template>
          </Statistic>
        </div>
      </Card>
    </Col>

    <Col :span="12">
      <Card class="general-card" :bordered="false">
        <ChainChartItem :url="POOL_CHART_URL" :uuid="props.uuid"
          title="连接池占用情况"
          chart-type="bar"
        />
      </Card>
    </Col>
  </Row>
</template>

<style lang="less" scoped>
.general-card {
  min-height: 224px;

  .content {
    height: 159px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
