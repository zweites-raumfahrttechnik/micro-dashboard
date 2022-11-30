<template>
  <div class="left-chart-3">
    <div class="lc3-header">权限管理</div>
    <div class="lc3-details">执行权限总数<span>245</span></div>
    <CapsuleChart class="lc3-chart" :config="state.config" />
  </div>
</template>

<script lang="ts" setup>
import { CapsuleChart } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
const state = reactive({
  config: {
    data: [
      {
        name: '申请权限',
        value: 78,
      },
      {
        name: '删除权限',
        value: 54,
      },
      {
        name: '审批权限',
        value: 123,
      },
      {
        name: '待审批权限',
        value: 167,
      },
      {
        name: '其他',
        value: 77,
      },
    ],
    colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
    unit: '个',
  },
});
</script>

<style lang="less">
.left-chart-3 {
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;

  .lc3-header {
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    text-indent: 20px;
    margin-top: 10px;
  }

  .lc3-details {
    height: 40px;
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
