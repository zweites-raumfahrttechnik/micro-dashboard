<script lang="ts" setup>
import { Layout, LayoutSider, LayoutContent, Drawer } from '@arco-design/web-vue';
import { useAppModelMap } from '@/hooks';

import PageLayout from './PageLayout.vue';
import Navbar from './components/NavbarComponent.vue';
import Menu from './components/MenuComponent.vue';
import Footer from './components/FooterComponent.vue';

const {
  hideMenu,
  navbar,
  menuWidth: menuWidthInModel,
  menu: renderMenu,
  menuCollapse,
  $patch: appPatch,
} = useAppModelMap();

const menuWidth = computed(() => {
  return menuCollapse.value ? 48 : menuWidthInModel.value;
});

const paddingStyle = computed(() => {
  const paddingLeft =
    renderMenu.value && !hideMenu.value ? { paddingLeft: `${menuWidth.value}px` } : {};
  const paddingTop = navbar.value ? { paddingTop: '60px' } : {};

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
  <Layout class="layout" :class="{ mobile: hideMenu }">
    <div v-if="navbar" class="layout-navbar">
      <Navbar />
    </div>

    <Layout>
      <!-- pc -->
      <LayoutSider
        v-if="renderMenu"
        v-show="!hideMenu"
        class="layout-sider"
        breakpoint="xl"
        :style="{ paddingTop: navbar ? '60px' : '' }"
        :width="menuWidth"
        :collapsed="menuCollapse"
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
        v-if="hideMenu"
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
        <LayoutContent>
          <PageLayout />
        </LayoutContent>

        <Footer />
      </Layout>
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

.layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
