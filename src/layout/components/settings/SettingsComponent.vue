<script lang="ts" setup>
import { Button, Drawer } from '@arco-design/web-vue';
import { IconSettings } from '@arco-design/web-vue/es/icon';
import { useAppModel } from '@/model';

import SettingsBlock from './SettingsBlock.vue';
import { Option } from './props';

const { state, patch, toggleSettingVisible } = useAppModel();

const layoutOptions = computed((): Option[] => [
  {
    name: '导航栏',
    type: 'switch',
    value: state.navbar,
    change: (val: unknown) => {
      patch({ navbar: val as boolean });
    },
  },
  {
    name: '菜单栏',
    type: 'switch',
    value: state.menu,
    change: (val: unknown) => {
      patch({ menu: val as boolean });
    },
  },
  {
    name: '页脚',
    type: 'switch',
    value: state.footer,
    change: (val: unknown) => {
      patch({ footer: val as boolean });
    },
  },
  {
    name: '多标签',
    type: 'switch',
    value: state.tabbar,
    change: (val: unknown) => {
      patch({ tabbar: val as boolean });
    },
  },
  {
    name: '菜单宽度',
    type: 'number',
    value: state.menuWidth,
    disabled: state.menu === false,
    change: (val: unknown) => {
      patch({ menuWidth: val as number });
    },
  },
]);

const handleDrawerCancel = () => {
  toggleSettingVisible();
};
</script>

<template>
  <div v-if="!state.navbar" class="fixed-setting-wrapper">
    <Button type="primary" @click="toggleSettingVisible">
      <template #icon>
        <IconSettings size="18" />
      </template>
    </Button>
  </div>

  <Drawer
    :width="300"
    unmount-on-close
    :visible="state.settingVisible"
    :footer="false"
    @cancel="handleDrawerCancel"
  >
    <template #title>页面配置</template>
    <SettingsBlock title="界面配置" :options="layoutOptions" />
    <SettingsBlock title="其他设置" :options="[]" />
  </Drawer>
</template>

<style lang="less" scoped>
.fixed-setting-wrapper {
  position: fixed;
  top: 280px;
  right: 0;
}
</style>
