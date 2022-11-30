<script lang="ts" setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart } from 'echarts/charts';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { ECBasicOption } from 'echarts/types/dist/shared';
import VChart from 'vue-echarts';

interface Props {
  option?: ECBasicOption;
  autoresize?: boolean;
  width?: string;
  height?: string;
}

use([CanvasRenderer, LineChart, BarChart, TooltipComponent, GridComponent]);

const props = withDefaults(defineProps<Props>(), {
  option: () => ({}),
  autoresize: true,
  width: '100%',
  height: '100%',
});

const render = ref(false);

nextTick(() => {
  render.value = true;
});
</script>

<template>
  <VChart
    v-if="render"
    :option="props.option"
    :autoresize="props.autoresize"
    :style="{ width: props.width, height: props.height }"
  />
</template>
