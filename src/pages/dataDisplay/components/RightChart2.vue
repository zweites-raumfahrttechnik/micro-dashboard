<script lang="ts" setup>
import { Charts, ScrollRankingBoard } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
import { INSTANCE_DATA_DISPLAY_URL } from '@/api/url';
import { useAxios } from '@vueuse/integrations/useAxios';
import { InstanceDataItem, InstanceDataList } from '@/api/types';
import { instance, ResponseWrap } from '@/api';
const { data, execute } = useAxios<ResponseWrap<InstanceDataList>>(
  INSTANCE_DATA_DISPLAY_URL,
  { method: 'GET' },
  instance,
);
watch(
  () => data.value?.data?.data,
  InstanceDataList => {
    state.config.data = new Array<InstanceDataItem>();
    state.config.data = InstanceDataList!;
  },
);
// const InstanceDataList=computed(() => data.value?.data?.data || []);
// onMounted(()=>{
//   execute
//   console.log(data.value?.data?.data)
// })

const state = reactive({
  config: {
    data: [
      {
        name: '',
        value: 55,
      },
    ],
    unit: '个',
  },
  // option: {
  //   series: [
  //     {
  //       type: 'pie',
  //       data: [
  //         { name: '获取成功', value: 93 },
  //         { name: '获取失败', value: 66 },
  //         { name: '删除获取', value: 52 },
  //         { name: '修改获取', value: 34 },
  //         { name: '其他', value: 22 },
  //       ],
  //       radius: ['45%', '65%'],
  //       insideLabel: {
  //         show: false,
  //       },
  //       outsideLabel: {
  //         labelLineEndLength: 10,
  //         formatter: '{percent}%\n{name}',
  //         style: {
  //           fontSize: 14,
  //           fill: '#fff',
  //         },
  //       },
  //     },
  //   ],
  //   color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
  // },
});
</script>

<template>
  <div class="right-chart-2">
    <div class="rc1-header">实例数据</div>

    <div class="rc1-chart-container">
      <ScrollRankingBoard style="height: 83%" :config="state.config"></ScrollRankingBoard>
      <!-- <div class="left">
        <div class="number">267</div>
        <div>执行获取总数</div>
      </div>
      
      <Charts class="right" :option="state.option" /> -->
    </div>
  </div>
</template>

<style lang="less">
.right-chart-2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .rc1-header {
    font-size: 20px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
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
