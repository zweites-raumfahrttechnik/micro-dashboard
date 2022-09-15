<script lang="ts" setup>
import { useAppModel } from '@/model';
import Footer from '@/components/FooterComponent.vue';

import Banner from './LoginBanner.vue';
import Form from './LoginForm.vue';

const {
  state: { title },
} = useAppModel();
</script>

<template>
  <div class="container">
    <div class="logo">
      <img
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        alt="logo"
      />
      <div class="logo-text">{{ title }}</div>
    </div>

    <Banner />

    <div class="content">
      <Form />

      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100vh;
}

.content {
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;
}

.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}

.logo {
  position: fixed;
  top: 24px;
  left: 22px;
  z-index: 1;
  display: inline-flex;
  align-items: center;

  &-text {
    margin: 0 4px;
    color: var(--color-fill-1);
    font-size: 20px;
  }
}
</style>
