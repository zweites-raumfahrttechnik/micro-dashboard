<template>
  <div class="bottom-charts">
    <div class="bc-chart-item">
      <div class="bcci-header">监听配置</div>
      <ActiveRingChart :config="state.config1" />
      <Label-Tag :config="state.labelConfig" />
    </div>
    <decoration-2 class="decoration-1" :reverse="true" style="width: 5px" />

    <div class="bc-chart-item">
      <div class="bcci-header">注册接口配置</div>
      <ActiveRingChart :config="state.config2" />
      <Label-Tag :config="state.labelConfig" />
    </div>

    <decoration-2 class="decoration-2" :reverse="true" style="width: 5px" />

    <div class="bc-chart-item">
      <div class="bcci-header">服务配置</div>
      <ActiveRingChart :config="state.config3" />
      <Label-Tag :config="state.labelConfig" />
    </div>

    <decoration-2 class="decoration-3" :reverse="true" style="width: 5px" />

    <div class="bc-chart-item">
      <div class="bcci-header">请求转发配置</div>
      <ActiveRingChart :config="state.config4" />
      <Label-Tag :config="state.labelConfig" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Decoration2, ActiveRingChart } from '@kjgl77/datav-vue3';
const state = reactive({
  config1: {
    data: [
      {
        name: '监听成功',
        value: 356,
      },
      {
        name: '监听失败',
        value: 215,
      },
      {
        name: '待监听',
        value: 90,
      },
      {
        name: '其他',
        value: 317,
      },
    ],
    color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
    radius: '85%',
    activeRadius: '90%',
  },

  config2: {
    data: [
      {
        name: '配置成功',
        value: 615,
      },
      {
        name: '配置失败',
        value: 322,
      },
      {
        name: '待配置',
        value: 198,
      },
      {
        name: '其他',
        value: 80,
      },
    ],
    color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
    radius: '85%',
    activeRadius: '90%',
  },

  config3: {
    data: [
      {
        name: '服务成功',
        value: 452,
      },
      {
        name: '服务失败',
        value: 512,
      },
      {
        name: '待服务',
        value: 333,
      },
      {
        name: '其他',
        value: 255,
      },
    ],
    color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
    radius: '85%',
    activeRadius: '90%',
  },

  config4: {
    data: [
      {
        name: '转发成功',
        value: 156,
      },
      {
        name: '转发失败',
        value: 415,
      },
      {
        name: '待转发',
        value: 90,
      },
      {
        name: '其他',
        value: 210,
      },
    ],
    color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
    radius: '85%',
    activeRadius: '90%',
  },

  labelConfig: {
    data: ['监听配置', '服务配置', '注册接口配置', '请求转发配置'],
  },
});
</script>

<style lang="less" scoped>
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .bc-chart-item {
    width: 25%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .bcci-header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }

  .dv-active-ring-chart {
    height: calc(~'100% - 80px');
  }

  .label-tag {
    height: 30px;
  }

  .active-ring-name {
    font-size: 10px !important;
  }

  .decoration-1 {
    display: absolute;
    left: 0%;
  }
  .decoration-2 {
    display: absolute;
    left: 0%;
  }
  .decoration-3 {
    display: absolute;
    left: 0%;
  }
}
</style>
