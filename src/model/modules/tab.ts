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
      console.log(route.fullPath);
      if (BAN_LIST.includes(route.name as string)) {
        return;
      }
      this.list.push(formatInfo(route));
      if (!route.meta.ignoreCache) {
        this.cached.add(route.name as string);
      }
    },

    deleteTab(idx: number) {
      if (idx === 0) {
        return;
      }

      this.cached.delete(this.list[idx].name);
      this.list.splice(idx, 1);
    },

    deleteTabOthers(idx: number) {
      for (let i = 1; i < this.list.length; i++) {
        if (i === idx) {
          continue;
        }
        this.cached.delete(this.list[i].name);
      }

      this.list = this.list.filter((_, index) => {
        if (index === 0 || index === idx) {
          return true;
        }

        return false;
      });
    },

    deleteTabRange(start?: number, end?: number) {
      if (start === undefined && end === undefined) {
        return;
      }

      let rStart = 1,
        rEnd = this.list.length;
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
        this.cached.delete(this.list[i].name);
      }
      this.list = this.list.filter((_, idx) => {
        if (idx >= rStart && idx < rEnd) {
          return false;
        }

        return true;
      });
    },
  },
});

export type { TabInfo, TabModelState };

export { useTabModel };
