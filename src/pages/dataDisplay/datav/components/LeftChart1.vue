<script lang="ts" setup>
import { Decoration2, CapsuleChart } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
import { SERVICE_MANAGE_MONITOR_URL } from '@/api/url';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ServiceMangeListData } from '@/api/types';
import { instance, ResponseWrap } from '@/api';

const { data: serviceMangeListData, execute } = useAxios<ResponseWrap<ServiceMangeListData>>(
  SERVICE_MANAGE_MONITOR_URL,
  { method: 'GET' },
  instance,
);

watch(
  () => serviceMangeListData.value?.data?.approveService,
  approveService => {
    console.log(`count is: ${approveService}`);
  },
);

const state = reactive({
  config: {
    data: [
      {
        name: '已上线服务',
        value: 167,
      },
      {
        name: '待审批服务',
        value: 123,
      },
      {
        name: '未通过审批服务',
        value: 67,
      },
    ],
    colors: ['#00baff', '#3de7c9', '#fff'],
    unit: '项',
  },
});
</script>
<template>
  <div class="left-chart-1">
    <div class="lc1-header">服务管理</div>
    <div class="lc1-details">执行服务总数<span>430</span></div>
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
    margin-bottom: 20px;
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
