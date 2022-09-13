import { defineStore } from 'pinia';
import defaultSettings from '@/config/settings.json';

interface AppState {
  navbar: boolean;
  tabbar: boolean;
  device: string;
  theme: string;
  menu: boolean;
  hideMenu: boolean;
  menuCollapse: boolean;
  menuWidth: number;
  footer: boolean;
  settingVisible: boolean;
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

    toggleSettingVisible() {
      this.settingVisible = !this.settingVisible;
    },
  },
});

export type { AppState };

export { useAppModel };
