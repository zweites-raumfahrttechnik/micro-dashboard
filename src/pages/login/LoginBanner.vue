<script lang="ts" setup>
import { Carousel, CarouselItem } from '@arco-design/web-vue';
import bannerImg from '@/assets/login/login-banner.png';

const carouselItem = computed(() => [
  {
    title: 'Buaaica 前端模板',
    subTitle: '开箱即用，使用Vue3 Setup语法构建',
    image: bannerImg,
  },
]);
</script>

<template>
  <div class="banner">
    <div class="banner-inner">
      <Carousel class="carousel" animation-name="fade">
        <CarouselItem v-for="item in carouselItem" :key="item.title">
          <div class="carousel-item">
            <div class="carousel-title">{{ item.title }}</div>
            <div class="carousel-sub-title">{{ item.subTitle }}</div>
            <img class="carousel-img" :src="item.image" />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/style/breakpoint.less';

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 550px;
  background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);

  &-inner {
    flex: 1;
    height: 100%;
  }
}

.carousel {
  height: 100%;

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &-title {
    color: var(--color-fill-1);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }

  &-sub-title {
    margin-top: 8px;
    color: var(--color-text-3);
    font-size: 14px;
    line-height: 22px;
  }

  &-img {
    width: 320px;
    margin-top: 30px;
  }
}

@media (max-width: @screen-lg) {
  .banner {
    width: 25%;
  }
}
</style>
