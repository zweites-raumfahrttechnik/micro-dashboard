<script lang="ts" setup>
import { Layout, LayoutSider, LayoutContent, Drawer } from '@arco-design/web-vue';
import { useAppModel } from '@/model';
import Footer from '@/components/FooterComponent.vue';

import { useResponsive } from './hooks';

import PageLayout from './PageLayout.vue';
import Navbar from './components/NavbarComponent.vue';
import Menu from './components/MenuComponent.vue';
import Tabbar from './components/TabbarComponent.vue';
import Settings from './components/settings/SettingsComponent.vue';

useResponsive();

const { state, patch: appPatch } = useAppModel();

const menuWidth = computed(() => {
  return state.menuCollapse ? 48 : state.menuWidth;
});

const paddingStyle = computed(() => {
  const paddingLeft = state.menu && !state.hideMenu ? { paddingLeft: `${menuWidth.value}px` } : {};
  const paddingTop = state.navbar ? { paddingTop: '60px' } : {};

  return { ...paddingLeft, ...paddingTop };
});

const drawerVisible = ref(false);

const handleDrawerCancel = () => {
  drawerVisible.value = false;
};

provide('toggleDrawerMenu', () => {
  drawerVisible.value = !drawerVisible.value;
});

const handleCollapse = (val: boolean) => {
  appPatch({ menuCollapse: val });
};
</script>

<template>
  <Layout class="layout" :class="{ mobile: state.hideMenu }">
    <div v-if="state.navbar" class="layout-navbar">
      <Navbar />
    </div>

    <Layout>
      <!-- pc -->
      <LayoutSider
        v-if="state.menu"
        v-show="!state.hideMenu"
        class="layout-sider"
        breakpoint="xl"
        :style="{ paddingTop: state.navbar ? '60px' : '' }"
        :width="state.menuWidth"
        :collapsed="state.menuCollapse"
        :collapsible="true"
        :hide-trigger="true"
        @collapse="handleCollapse"
      >
        <div class="menu-wrapper">
          <Menu />
        </div>
      </LayoutSider>

      <!-- mobile -->
      <Drawer
        v-if="state.hideMenu"
        mask-closable
        placement="left"
        :visible="drawerVisible"
        :footer="false"
        :closable="false"
        @cancel="handleDrawerCancel"
      >
        <Menu />
      </Drawer>

      <Layout class="layout-content" :style="paddingStyle">
        <Tabbar v-if="state.tabbar" />

        <LayoutContent>
          <PageLayout />
        </LayoutContent>

        <Footer v-if="state.footer" />
      </Layout>
    </Layout>
  </Layout>

  <Settings />
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

.layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
