<script lang="ts" setup>
import { Decoration2, CapsuleChart } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
import { SERVICE_DATA_DISPLAY_URL } from '@/api/url';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ServiceDataList } from '@/api/types';
import { instance, ResponseWrap } from '@/api';

const { data, execute } = useAxios<ResponseWrap<ServiceDataList>>(
  SERVICE_DATA_DISPLAY_URL,
  { method: 'GET' },
  instance,
);

const allService = ref(0);

watch(
  () => data.value?.data,
  ServiceDataList => {
    state.config.data[0].value = Number(ServiceDataList?.liveService);
    state.config.data[1].value = Number(ServiceDataList?.approveService);
    state.config.data[2].value = Number(ServiceDataList?.notApproveService);
    allService.value =
      Number(ServiceDataList?.liveService) +
      Number(ServiceDataList?.approveService) +
      Number(ServiceDataList?.notApproveService);
  },
);

const state = reactive({
  config: {
    data: [
      {
        name: '已上线服务',
        value: 0,
      },
      {
        name: '待审批服务',
        value: 0,
      },
      {
        name: '未通过审批服务',
        value: 0,
      },
    ],

    unit: '项',
  },
});
</script>
<template>
  <div class="left-chart-1">
    <div class="lc1-header">服务管理</div>
    <div class="lc1-details">
      服务总数<span>{{ allService }}</span>
    </div>
    <CapsuleChart class="lc1-chart" :config="state.config" />
    <decoration-2 style="height: 10px" />
  </div>
</template>

<style lang="less">
.left-chart-1 {
  width: 100%;
  height: 37%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .lc1-details {
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

  .lc1-chart {
    flex: 1;
  }
}
</style>
