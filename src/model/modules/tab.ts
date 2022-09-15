import { RouteLocationNormalized } from 'vue-router';
import { REDIRECT_NAME } from '@/router/modules/base';

interface TabInfo {
  title: string;
  name: string;
  fullPath: string;
  query?: unknown;
  ignoreCache?: boolean;
}

interface TabModelState {
  list: TabInfo[];
  cached: Set<string>;
}

const DEFAULT_NAME = 'Welcome';

const DEFAULT_ROUTE = {
  title: '欢迎',
  name: DEFAULT_NAME,
  fullPath: '/dashboard/welcome',
};

const BAN_LIST = [REDIRECT_NAME, DEFAULT_NAME];

const formatInfo = (route: RouteLocationNormalized): TabInfo => {
  const { name, meta, fullPath, query } = route;

  return {
    title: meta.locale || '',
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache,
  };
};

const useTabModel = createGlobalState(() => {
  const cached = ref(new Set([DEFAULT_NAME]));
  const tabList = ref([DEFAULT_ROUTE]);

  const cacheList = computed(() => Array.from(cached.value));

  const updateTabList = (route: RouteLocationNormalized) => {
    console.log(route.fullPath);
    if (BAN_LIST.includes(route.name as string)) {
      return;
    }
    tabList.value.push(formatInfo(route));
    if (!route.meta.ignoreCache) {
      cached.value.add(route.name as string);
    }
  };

  const deleteTab = (idx: number) => {
    if (idx === 0) {
      return;
    }

    cached.value.delete(tabList.value[idx].name);
    tabList.value.splice(idx, 1);
  };

  const deleteTabOthers = (idx: number) => {
    for (let i = 1; i < tabList.value.length; i++) {
      if (i === idx) {
        continue;
      }
      cached.value.delete(tabList.value[i].name);
    }

    tabList.value = tabList.value.filter((_, index) => {
      if (index === 0 || index === idx) {
        return true;
      }

      return false;
    });
  };

  const deleteTabRange = (start?: number, end?: number) => {
    if (start === undefined && end === undefined) {
      return;
    }

    let rStart = 1,
      rEnd = tabList.value.length;
    if (start !== undefined) {
      if (start === 0) {
        start = 1;
      }
      rStart = start;
    }

    if (end !== undefined) {
      rEnd = end;
    }

    if (rStart >= rEnd) {
      return;
    }

    for (let i = rStart; i < rEnd; i++) {
      cached.value.delete(tabList.value[i].name);
    }
    tabList.value = tabList.value.filter((_, idx) => {
      if (idx >= rStart && idx < rEnd) {
        return false;
      }

      return true;
    });
  };

  return {
    cached,
    tabList,
    cacheList,
    updateTabList,
    deleteTab,
    deleteTabRange,
    deleteTabOthers,
  };
});

export type { TabInfo, TabModelState };

export { useTabModel };
