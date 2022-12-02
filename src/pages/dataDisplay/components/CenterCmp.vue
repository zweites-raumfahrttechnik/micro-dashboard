<script lang="ts" setup>
import { Decoration1, ActiveRingChart } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';

import { INTEGRATED_SERVICE_DATA_DISPLAY_URL } from '@/api/url';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ServiceData } from '@/api/types';
import { instance, ResponseWrap } from '@/api';
const { data, execute } = useAxios<ResponseWrap<ServiceData>>(
  INTEGRATED_SERVICE_DATA_DISPLAY_URL,
  { method: 'GET' },
  instance,
);
const allintegratedService = ref(0);
watch(
  () => data.value?.data,
  ServiceData => {
    state.config.data[0].value = Number(ServiceData?.systemOrientedService);
    state.config.data[1].value = Number(ServiceData?.serviceOrientedService);
    state.config.data[2].value = Number(ServiceData?.configOrientedService);
    state.config.data[3].value = Number(ServiceData?.otherService);
    allintegratedService.value =
      Number(ServiceData?.systemOrientedService) +
      Number(ServiceData?.serviceOrientedService) +
      Number(ServiceData?.configOrientedService) +
      Number(ServiceData?.otherService);
  },
);

const state = reactive({
  config: {
    data: [
      {
        name: '系统型服务',
        value: 315,
      },
      {
        name: '服务型服务',
        value: 415,
      },
      {
        name: '配置型服务',
        value: 90,
      },
      {
        name: '其他服务',
        value: 317,
      },
    ],
    color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
    lineWidth: 20,
    radius: '75%',
    activeRadius: '80%',
  },
});
</script>
<template>
  <div class="center-cmp">
    <div class="cc-header">
      <decoration-1 style="width: 200px; height: 50px" />
      <decoration-1 style="width: 200px; height: 50px" />
    </div>

    <div class="cc-details">
      <div class="title">服务化集成总数:</div>
      <!-- <DigitalFlop   :config="state.config1"></DigitalFlop> -->
      <div class="card">{{ allintegratedService }}</div>
      <!-- <div class="card">1</div>
      <div class="card">3</div>
      <div class="card">7</div>
      <div class="card">2</div> -->
    </div>

    <div class="cc-main-container">
      <div class="ccmc-left">
        <div class="station-info">
          系统型服务<span>{{ state.config.data[0].value }}</span>
        </div>
        <div class="station-info">
          服务型服务<span>{{ state.config.data[1].value }}</span>
        </div>
      </div>

      <ActiveRingChart class="ccmc-middle" :config="state.config" />

      <div class="ccmc-right">
        <div class="station-info">
          <span>{{ state.config.data[2].value }}</span
          >配置型服务
        </div>
        <div class="station-info">
          <span>{{ state.config.data[3].value }}</span
          >其他服务
        </div>
      </div>

      <!-- <LabelTag :config="state.labelConfig" /> -->
    </div>
  </div>
</template>

<style lang="less">
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;

  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
  }

  .cc-details {
    height: 120px;
    display: flex;
    justify-content: center;
    font-size: 30px;
    align-items: center;
    width: 100%;
    margin-left: 5%;
    margin-right: 5%;
    .title {
      width: 30%;
    }
    .card {
      background-color: rgba(4, 49, 128, 0.6);
      color: #08e5ff;
      height: 70px;
      width: 40%;
      font-size: 45px;
      font-weight: bold;
      line-height: 70px;
      text-align: center;
      margin: 10px;
    }
  }

  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;

    .ccmc-middle {
      width: 50%;
      height: 100%;

      .active-ring-name {
        font-size: 20px !important;
      }
    }

    .ccmc-left,
    .ccmc-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 18px;

      span {
        font-size: 40px;
        font-weight: bold;
      }

      .station-info {
        height: 80px;
        display: flex;
        align-items: center;
      }
    }

    .ccmc-left {
      align-items: flex-end;

      span {
        margin-left: 20px;
      }
    }

    .ccmc-right {
      align-items: flex-start;

      span {
        margin-right: 20px;
      }
    }
  }

  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
