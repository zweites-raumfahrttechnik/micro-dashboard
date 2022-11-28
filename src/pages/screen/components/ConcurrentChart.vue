<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { LegendComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { Row, Col, Card } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { ConcurrentChartValue } from '@/api/types';
import { CONCURRENT_CHART_URL } from '@/api/url';
import { useAppModel } from '@/model';

import Chart from './ChartComponent.vue';

interface ToolTipFormatterParams extends CallbackDataParams {
  axisDim: string;
  axisIndex: number;
  axisType: string;
  axisId: string;
  axisValue: string;
  axisValueLabel: string;
}

use([CanvasRenderer, LegendComponent, TooltipComponent, GridComponent, LineChart]);

const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
  return items
    .map(
      el => `<div class="content-panel">
        <p>
          <span style="background-color: ${el.color}" class="tooltip-item-icon"></span>
          <span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">
        ${el.value}%
        </span>
      </div>`,
    )
    .join('');
};

const props = defineProps<{ uuid: string }>();

const { data, execute } = useAxios<ResponseWrap<ConcurrentChartValue>>(
  CONCURRENT_CHART_URL,
  { params: { uuid: props.uuid } },
  instance,
);

const { state } = useAppModel();

watch(
  () => props.uuid,
  () => execute({ params: { uuid: props.uuid } }),
);

const isDark = computed(() => state.theme === 'dark');

const xAxis = computed(() => {
  if (!data.value?.data?.xAxis) {
    return [];
  }

  return data.value.data.xAxis;
});

const concurrentData = computed(() => {
  if (!data.value?.data?.concurrent) {
    return [];
  }

  return data.value.data.concurrent;
});

const throughData = computed(() => {
  if (!data.value?.data?.through) {
    return [];
  }

  return data.value.data.through;
});

const option = computed(() => {
  return {
    grid: {
      left: '40',
      right: 0,
      top: '20',
      bottom: '100',
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      textStyle: {
        color: '#4E5969',
      },
    },
    xAxis: {
      type: 'category',
      data: xAxis.value,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: isDark.value ? '#3f3f3f' : '#A9AEB8',
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: '#86909C',
        },
        interval(idx: number) {
          if (idx === 0) return false;
          if (idx === xAxis.value.length - 1) return false;
          return true;
        },
      },
      axisLabel: {
        color: '#86909C',
        formatter(value: number, idx: number) {
          if (idx === 0) return '';
          if (idx === xAxis.value.length - 1) return '';
          return `${value}`;
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#86909C',
        formatter: '{value}%',
      },
      splitLine: {
        lineStyle: {
          color: isDark.value ? '#3F3F3F' : '#E5E6EB',
        },
      },
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter(params: ToolTipFormatterParams[]) {
        const [firstElement] = params;
        return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
      },
      className: 'echarts-tooltip-diy',
    },
    series: [
      {
        name: '并发度',
        data: concurrentData.value,
        type: 'line',
        smooth: true,
        showSymbol: false,
        color: isDark.value ? '#3D72F6' : '#246EFF',
        symbol: 'circle',
        symbolSize: 10,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#E0E3FF',
          },
        },
      },
      {
        name: '吞吐量',
        data: throughData.value,
        type: 'line',
        smooth: true,
        showSymbol: false,
        color: isDark.value ? '#A079DC' : '#00B2FF',
        symbol: 'circle',
        symbolSize: 10,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#E2F2FF',
          },
        },
      },
    ],
  };
});
</script>

<template>
  <Row :gutter="16">
    <Col :span="24">
      <Card class="general-card" :bordered="false">
        <template #title>并发和吞吐量情况</template>
        <Chart style="width: 100%; height: 370px" :option="option" />
      </Card>
    </Col>
  </Row>
</template>

<style lang="less">
.echarts-tooltip-diy {
  background: linear-gradient(
    304.17deg,
    rgba(253 254 255 60%) -6.04%,
    rgba(244 247 252 60%) 85.2%
  ) !important;
  border: none !important;

  /* Note: backdrop-filter has minimal browser support */
  backdrop-filter: blur(10px) !important;
  border-radius: 6px !important;

  .content-panel {
    display: flex;
    justify-content: space-between;
    padding: 0 9px;
    background: rgba(255 255 255 80%);
    width: 164px;
    height: 32px;
    line-height: 32px;
    box-shadow: 6px 0 20px rgba(34 87 188 10%);
    border-radius: 4px;
    margin-bottom: 4px;
  }

  .tooltip-title {
    margin: 0 0 10px;
  }

  p {
    margin: 0;
  }

  .tooltip-title,
  .tooltip-value {
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #1d2129;
    font-weight: bold;
  }

  .tooltip-item-icon {
    display: inline-block;
    margin-right: 8px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}
</style>
