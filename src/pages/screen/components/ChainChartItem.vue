<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Spin, Card, Statistic, TypographyText } from '@arco-design/web-vue';
import { IconArrowRise, IconArrowFall } from '@arco-design/web-vue/es/icon';

import { instance, ResponseWrap } from '@/api';
import { ChartValue } from '@/api/types';

import Chart from './ChartComponent.vue';

const props = defineProps<{
  title: string;
  url: string;
  uuid: string;
  chartType: 'bar' | 'line';
}>();

const { data, execute } = useAxios<ResponseWrap<ChartValue>>(
  props.url,
  { params: { uuid: props.uuid } },
  instance,
);

watch(
  () => props.uuid,
  () => execute({ params: { uuid: props.uuid } }),
);

const growth = computed(() => {
  if (!data.value?.data?.growth) {
    return 0;
  }

  if (data.value.data.growth >= 0) {
    return data.value.data.growth;
  }
  return -data.value.data.growth;
});

const isUp = computed(() => {
  if (!data.value?.data?.growth) {
    return true;
  }

  return data.value.data.growth > 0;
});

const chartData = computed(() => {
  if (!data.value?.data?.value) {
    return [];
  }

  if (props.chartType === 'bar') {
    return data.value.data.value.map((el, idx) => ({
      value: el,
      itemStyle: {
        color: idx % 2 ? '#468DFF' : '#86DF6C',
      },
    }));
  }

  return data.value.data.value;
});

const chartOption = computed(() => {
  return {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      show: false,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: '{c}',
    },
    series: [
      {
        data: chartData.value,
        ...(props.chartType === 'bar'
          ? {
              type: 'bar',
              barWidth: 7,
              barGap: '0',
            }
          : {
              type: 'line',
              showSymbol: false,
              smooth: true,
              lineStyle: {
                color: '#4080FF',
              },
            }),
      },
    ],
  };
});
</script>

<template>
  <Spin style="width: 100%">
    <Card class="general-card" :bordered="false" :header-style="{ paddingBottom: '12px' }">
      <template #title>{{ props.title }}</template>

      <div class="content">
        <Statistic
          :value="data?.data?.count"
          :show-group-separator="true"
          :value-from="0"
          animation
        />

        <TypographyText class="percent-text" :type="isUp ? 'danger' : 'success'">
          {{ growth }}
          <IconArrowRise v-if="isUp" />
          <IconArrowFall v-else />
        </TypographyText>
      </div>

      <div class="chart">
        <Chart :option="chartOption" />
      </div>
    </Card>
  </Spin>
</template>

<style lang="less" scoped>
.general-card {
  min-height: 204px;
}

.content {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
}

.percent-text {
  margin-left: 16px;
}

.chart {
  width: 100%;
  height: 80px;
  vertical-align: bottom;
}
</style>
