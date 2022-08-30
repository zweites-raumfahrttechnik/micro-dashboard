import { defineStore } from 'pinia';
import defaultSettings from '@/config/settings.json';

interface AppState {
  theme: string;
  navbar: boolean;
  hideMenu: boolean;
  menuCollapse: boolean;
  device: string;
  [key: string]: unknown;
}

const useAppModel = defineStore('app-model', {
  state: (): AppState => ({ ...defaultSettings }),

  actions: {
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
        return;
      }

      this.theme = 'light';
      document.body.removeAttribute('arco-theme');
    },
  },
});

export type { AppState };

export { useAppModel };
