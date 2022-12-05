<script lang="ts" setup>
import {
  BorderBox1 as DvBorderBox1,
  BorderBox2 as DvBorderBox2,
  BorderBox3 as DvBorderBox3,
  BorderBox4 as DvBorderBox4,
} from '@kjgl77/datav-vue3';
import LeftChart1 from './components/LeftChart1.vue';
import LeftChart2 from './components/LeftChart2.vue';
import LeftChart3 from './components/LeftChart3.vue';
import CenterCmp from './components/CenterCmp.vue';
import RightChart2 from './components/RightChart2.vue';
import BottomCharts from './components/BottomCharts.vue';
</script>

<template>
  <div id="data-view">
    <div class="main-header">
      <div class="mh-left"></div>
      <div class="mh-middle">软件服务化集成平台</div>
      <div class="mh-right"></div>
    </div>

    <DvBorderBox1 class="main-container">
      <DvBorderBox3 class="left-chart-container">
        <LeftChart1 />
        <LeftChart2 />
        <LeftChart3 />
      </DvBorderBox3>

      <div class="right-main-container">
        <div class="rmc-top-container">
          <DvBorderBox3 ref="dvBorderBox3" class="rmctc-left-container">
            <CenterCmp />
          </DvBorderBox3>

          <div class="rmctc-right-container">
            <!-- <DvBorderBox3 class="rmctc-chart-1">
              <RightChart1 />
            </DvBorderBox3> -->

            <DvBorderBox4 class="rmctc-chart-2" :reverse="true">
              <RightChart2 />
            </DvBorderBox4>
          </div>
        </div>

        <DvBorderBox4 class="rmc-bottom-container">
          <BottomCharts />
        </DvBorderBox4>
      </div>
    </DvBorderBox1>
  </div>
</template>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  //background-color: #030409;
  background-image: url('./img/bg.png');
  background-size: 100% 100%;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 15px;
      color: rgb(1, 134, 187);

      a:visited {
        color: rgb(1, 134, 187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left,
    .mh-right {
      width: 450px;
    }
  }

  .main-container {
    height: calc(~'100% - 80px');

    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .left-chart-container {
    width: 22%;
    padding: 10px;
    box-sizing: border-box;

    .border-box-content {
      flex-direction: column;
    }
  }

  .right-main-container {
    width: 78%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    height: 65%;
    display: flex;
  }

  .rmctc-left-container {
    width: 65%;
  }

  .rmctc-right-container {
    height: 100%;
    width: 35%;
  }

  .rmc-bottom-container {
    height: 35%;
  }

  .rmctc-chart-1,
  .rmctc-chart-2 {
    height: 100%;
  }
}
</style>
