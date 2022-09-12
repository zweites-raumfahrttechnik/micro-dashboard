<script lang="ts" setup>
import { Affix, Dropdown, Doption, Tag } from '@arco-design/web-vue';
import {
  IconMenu,
  IconRefresh,
  IconClose,
  IconToLeft,
  IconToRight,
  IconSwap,
  IconFolderDelete,
} from '@arco-design/web-vue/es/icon';
import { AffixInstance } from '@arco-design/web-vue/es/affix';
import { useAppModelMap, useTabModelMap } from '@/hooks';

const { navbar } = useAppModelMap();
const { tabList, updateTabList, deleteTab } = useTabModelMap();

const route = useRoute();
const router = useRouter();

const affixRef = ref<AffixInstance>();

watch(
  () => navbar,
  () => {
    affixRef.value?.updatePosition();
  },
);

watchEffect(() => {
  if (route.meta.noAffix || tabList.value.some(item => item.fullPath === route.fullPath)) {
    return;
  }
  updateTabList(route);
});

const offsetTop = computed(() => (navbar.value ? 60 : 0));

const currentIdx = computed(() => {
  for (let i = 0; i < tabList.value.length; i++) {
    if (tabList.value[i].fullPath === route.fullPath) {
      return i;
    }
  }

  return 0;
});

const disabledCurrent = computed(() => {
  if (currentIdx.value === 0) {
    return true;
  }

  return false;
});

const disabledLeft = computed(() => {
  if (currentIdx.value === 0 || currentIdx.value === 1) {
    return true;
  }

  return false;
});

const disabledRight = computed(() => {
  if (currentIdx.value === tabList.value.length - 1) {
    return true;
  }

  return false;
});
</script>

<template>
  <div class="tab-bar-container">
    <Affix ref="affixRef" :offset-top="offsetTop">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <div class="tags-wrap">
            <Tag
              v-for="(item, index) in tabList"
              :key="item.fullPath"
              :color="item.fullPath === route.fullPath ? 'blue' : ''"
              closable
              @click="() => router.push(item.fullPath)"
              @close="() => deleteTab(index, item.name)"
            >
              {{ item.title }}
            </Tag>
          </div>
        </div>
        <div class="tab-bar-operation">
          <Dropdown trigger="click" :popup-max-height="false">
            <IconMenu />

            <template #content>
              <Doption>
                <IconRefresh />
                <span>重新加载</span>
              </Doption>
              <Doption class="sperate-line" :disabled="disabledCurrent">
                <IconClose />
                <span>关闭当前标签页</span>
              </Doption>
              <Doption :disabled="disabledLeft">
                <IconToLeft />
                <span>关闭左侧标签页</span>
              </Doption>
              <Doption class="sperate-line" :disabled="disabledRight">
                <IconToRight />
                <span>关闭右侧标签页</span>
              </Doption>
              <Doption>
                <IconSwap />
                <span>关闭其他标签页</span>
              </Doption>
              <Doption>
                <IconFolderDelete />
                <span>关闭全部标签页</span>
              </Doption>
            </template>
          </Dropdown>
        </div>
      </div>
    </Affix>
  </div>
</template>

<style lang="less" scoped>
.tab-bar-container {
  position: relative;
  background-color: var(--color-bg-2);
}

.tab-bar-box {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: var(--color-bg-2);

  .tab-bar-scroll {
    height: 32px;
    flex: 1;
    overflow: hidden;
  }

  .tags-wrap {
    padding: 4px 0;
    height: 48px;
    white-space: nowrap;
    overflow-x: auto;
  }
}

:deep(.arco-tag) {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  cursor: pointer;

  &:first-child {
    .arco-tag-close-btn {
      display: none;
    }
  }
}

.tab-bar-operation {
  display: flex;
  align-items: center;
  height: 32px;
  cursor: pointer;
}

.sperate-line {
  border-bottom: 1px solid var(--color-neutral-3);
}

:deep(.arco-dropdown-option-content) {
  span {
    margin-left: 10px;
  }
}
</style>
