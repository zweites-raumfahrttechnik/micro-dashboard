<template>
  <div class="left-chart-2">
    <div class="lc2-header">实例管理</div>
    <div class="lc2-details">执行实例总数<span>245</span></div>
    <Charts class="lc2-chart" :option="state.option" />
    <decoration-2 style="height: 10px" />
  </div>
</template>

<script lang="ts" setup>
import { Decoration2, Charts } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
const state = reactive({
  option: {
    series: [
      {
        type: 'pie',
        data: [
          { name: '添加实例', value: 93 },
          { name: '删除实例', value: 32 },
          { name: '审批实例', value: 65 },
          { name: '待审批实例', value: 44 },
          { name: '其他', value: 52 },
        ],
        radius: ['45%', '65%'],
        insideLabel: {
          show: false,
        },
        outsideLabel: {
          labelLineEndLength: 10,
          formatter: '{percent}%\n{name}',
          style: {
            fontSize: 14,
            fill: '#fff',
          },
        },
      },
    ],
    color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
  },
});
</script>

<style lang="less">
.left-chart-2 {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;

  .lc2-header {
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    text-indent: 20px;
    margin-top: 10px;
  }

  .lc2-details {
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

  .lc2-chart {
    height: calc(~'100% - 80px');
  }
}
</style>
