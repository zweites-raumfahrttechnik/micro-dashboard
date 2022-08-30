<script lang="ts" setup>
import { Layout, LayoutSider } from '@arco-design/web-vue';
import { useAppModelMap } from '@/hooks';

import Navbar from './components/NavbarComponent.vue';
import Menu from './components/MenuComponent.vue';

const { hideMenu, navbar } = useAppModelMap();

const drawerVisible = ref(false);
provide('toggleDrawerMenu', () => {
  drawerVisible.value = !drawerVisible.value;
});
</script>

<template>
  <Layout class="layout" :class="{ mobile: hideMenu }">
    <div v-if="navbar" class="layout-navbar">
      <Navbar />
    </div>

    <Layout>
      <LayoutSider
        class="layout-sider"
        :style="{ paddingTop: navbar ? '60px' : '' }"
        :collapsible="true"
        :hide-trigger="true"
      >
        <div class="menu-wrapper">
          <Menu />
        </div>
      </LayoutSider>
    </Layout>
  </Layout>
</template>

<style lang="less" scoped>
@import '@/style/variable';

.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2 cubic-bezier(0.34, 0.69, 0.1, 1);

  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-y: hidden;

  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}
</style>
