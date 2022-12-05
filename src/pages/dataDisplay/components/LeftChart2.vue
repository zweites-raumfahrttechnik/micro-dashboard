<script lang="ts" setup>
import { instance, ResponseWrap } from '@/api';
import { ConfigDataList } from '@/api/types';
import { CONFIG_DATA_DISPLAY_URL } from '@/api/url';
import { Decoration2, Charts, ScrollRankingBoard, CapsuleChart } from '@kjgl77/datav-vue3';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive } from 'vue';
const { data, execute } = useAxios<ResponseWrap<ConfigDataList>>(
  CONFIG_DATA_DISPLAY_URL,
  { method: 'GET' },
  instance,
);

const allConfigNum = ref(0);
watch(
  () => data.value?.data,
  ServiceDataList => {
    state.config.data[0].value = Number(ServiceDataList?.liveConfig);
    state.config.data[1].value = Number(ServiceDataList?.approveConfig);
    state.config.data[2].value = Number(ServiceDataList?.notApproveConfig);
    allConfigNum.value =
      Number(ServiceDataList?.liveConfig) +
      Number(ServiceDataList?.approveConfig) +
      Number(ServiceDataList?.notApproveConfig);
  },
);

const state = reactive({
  config: {
    data: [
      {
        name: '已上线配置',
        value: 55,
      },
      {
        name: '待审批配置',
        value: 120,
      },
      {
        name: '未通过审批配置',
        value: 78,
      },
    ],
    unit: '项',
  },
});
</script>

<template>
  <div class="left-chart-2">
    <div class="lc2-header">配置管理</div>
    <div class="lc2-details">
      配置总数<span>{{ allConfigNum }}</span>
    </div>
    <!-- <Charts class="lc2-chart" :option="state.option" /> -->
    <!-- <ScrollRankingBoard style="height:60%" :config="state.config"></ScrollRankingBoard> -->
    <CapsuleChart class="lc1-chart" :config="state.config" />
    <decoration-2 style="height: 10px" />
  </div>
</template>

<style lang="less">
.left-chart-2 {
  width: 100%;
  height: 37%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  .lc2-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .lc2-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc2-chart {
    flex: 1;
  }
}
</style>
