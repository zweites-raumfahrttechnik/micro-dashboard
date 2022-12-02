<script lang="ts" setup>
import { Decoration2, ActiveRingChart, ScrollBoard } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
import { CLUSTER_DATA_DISPlAY_URL } from '@/api/url';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ClusterDataList } from '@/api/types';
import { instance, ResponseWrap } from '@/api';

const { data, execute } = useAxios<ResponseWrap<ClusterDataList>>(
  CLUSTER_DATA_DISPlAY_URL,
  { method: 'GET' },
  instance,
);

watch(
  () => data.value?.data?.data,
  ClusterDataList => {
    console.log(ClusterDataList);
    state.config.data = ClusterDataList!;
  },
);

const state = reactive({
  config: {
    header: ['ip地址', 'CPU利用率', '内存利用率', '磁盘利用率', '带宽'],
    data: [
      ['行1列1', '行1列2', '行1列3', '行1列2', '行1列3'],
      ['行2列1', '行2列2', '行2列3'],
      ['行3列1', '行3列2', '行3列3'],
      ['行4列1', '行4列2', '行4列3'],
      ['行5列1', '行5列2', '行5列3'],
      ['行6列1', '行6列2', '行6列3'],
      ['行7列1', '行7列2', '行7列3'],
      ['行8列1', '行8列2', '行8列3'],
      ['行9列1', '行9列2', '行9列3'],
      ['行10列1', '行10列2', '行10列3'],
    ],
    index: true,
    columnWidth: [50],
    align: ['center'],
  },

  // config1: {
  //   data: [
  //     {
  //       name: '监听成功',
  //       value: 356,
  //     },
  //     {
  //       name: '监听失败',
  //       value: 215,
  //     },
  //     {
  //       name: '待监听',
  //       value: 90,
  //     },
  //     {
  //       name: '其他',
  //       value: 317,
  //     },
  //   ],
  //   color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
  //   radius: '85%',
  //   activeRadius: '90%',
  // },

  // config2: {
  //   data: [
  //     {
  //       name: '配置成功',
  //       value: 615,
  //     },
  //     {
  //       name: '配置失败',
  //       value: 322,
  //     },
  //     {
  //       name: '待配置',
  //       value: 198,
  //     },
  //     {
  //       name: '其他',
  //       value: 80,
  //     },
  //   ],
  //   color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
  //   radius: '85%',
  //   activeRadius: '90%',
  // },

  // config3: {
  //   data: [
  //     {
  //       name: '服务成功',
  //       value: 452,
  //     },
  //     {
  //       name: '服务失败',
  //       value: 512,
  //     },
  //     {
  //       name: '待服务',
  //       value: 333,
  //     },
  //     {
  //       name: '其他',
  //       value: 255,
  //     },
  //   ],
  //   color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
  //   radius: '85%',
  //   activeRadius: '90%',
  // },

  // config4: {
  //   data: [
  //     {
  //       name: '转发成功',
  //       value: 156,
  //     },
  //     {
  //       name: '转发失败',
  //       value: 415,
  //     },
  //     {
  //       name: '待转发',
  //       value: 90,
  //     },
  //     {
  //       name: '其他',
  //       value: 210,
  //     },
  //   ],
  //   color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
  //   radius: '85%',
  //   activeRadius: '90%',
  // },

  // labelConfig: {
  //   data: ['监听配置', '服务配置', '注册接口配置', '请求转发配置'],
  // },
});
</script>
<template>
  <div class="bottom-charts">
    <ScrollBoard
      style="margin-top: 10px; margin-left: 15px; margin-left: 10px; width: 100%; height: 95%"
      :config="state.config"
    ></ScrollBoard>
    <!-- <div class="bc-chart-item">
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
    </div> -->
  </div>
</template>

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
