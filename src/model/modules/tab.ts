import { RouteLocationNormalized } from 'vue-router';

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

const BAN_LIST = [''];

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

const useTabModel = defineStore('tab-model', {
  state: (): TabModelState => ({
    cached: new Set([DEFAULT_NAME]),
    list: [DEFAULT_ROUTE],
  }),

  getters: {
    tabList(): TabInfo[] {
      return this.list;
    },
    cacheList(): string[] {
      return Array.from(this.cached);
    },
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string)) {
        return;
      }
      this.list.push(formatInfo(route));
      if (!route.meta.ignoreCache) {
        this.cached.add(route.name as string);
      }
    },

    deleteTab(idx: number, name: string) {
      this.list.splice(idx, 1);
      this.cached.delete(name);
    },
  },
});

export type { TabInfo, TabModelState };

export { useTabModel };
