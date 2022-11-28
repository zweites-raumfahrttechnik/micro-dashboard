<template>
  <div class="right-chart-1">
    <div class="rc1-header">配置管理</div>

    <div class="rc1-chart-container">
      <div class="left">
        <div class="number">262</div>
        <div>执行配置总数</div>
      </div>

      <CapsuleChart class="right" :config="state.config" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CapsuleChart } from '@kjgl77/datav-vue3';
const state = reactive({
  config: {
    data: [
      {
        name: '删除配置',
        value: 25,
      },
      {
        name: '修改配置',
        value: 66,
      },
      {
        name: '发布配置',
        value: 123,
      },
      {
        name: '待审批配置',
        value: 72,
      },
      {
        name: '审批删除配置',
        value: 99,
      },
    ],
    unit: '个',
  },
});
</script>

<style lang="less">
.right-chart-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .rc1-header {
    font-size: 20px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
  }

  .rc1-chart-container {
    flex: 1;
    display: flex;
  }

  .left {
    width: 30%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .number {
      font-size: 34px;
      color: #096dd9;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }

  .right {
    flex: 1;
    padding-bottom: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
}
</style>
