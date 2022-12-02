<script lang="ts" setup>
import { CapsuleChart } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { PermissionDataList } from '@/api/types';
import { PERMISSION_DATA_DISPLAY_URL } from '@/api/url';

const { data, execute } = useAxios<ResponseWrap<PermissionDataList>>(
  PERMISSION_DATA_DISPLAY_URL,
  { method: 'GET' },
  instance,
);
const requestPermissionNum = ref(0);
watch(
  () => data.value?.data,
  PermissionDataList => {
    state.config.data[0].value = Number(PermissionDataList?.livePermission);
    state.config.data[1].value = Number(PermissionDataList?.approvePermission);
    state.config.data[2].value = Number(PermissionDataList?.notApprovePermission);
    requestPermissionNum.value =
      Number(PermissionDataList?.livePermission) +
      Number(PermissionDataList?.approvePermission) +
      Number(PermissionDataList?.notApprovePermission);
  },
);
const state = reactive({
  config: {
    data: [
      {
        name: '通过审批权限',
        value: 123,
      },
      {
        name: '待审批权限',
        value: 167,
      },
      {
        name: '未通过审批权限',
        value: 54,
      },
    ],
    unit: '项',
  },
});
</script>
<template>
  <div class="left-chart-3">
    <div class="lc3-header">权限管理</div>
    <div class="lc3-details">
      申请权限总数<span>{{ requestPermissionNum }}</span>
    </div>
    <CapsuleChart class="lc3-chart" :config="state.config" />
  </div>
</template>
<style lang="less">
.left-chart-3 {
  width: 100%;
  height: 37%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  .lc3-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .lc3-details {
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

  .lc3-chart {
    flex: 1;
  }
}
</style>
