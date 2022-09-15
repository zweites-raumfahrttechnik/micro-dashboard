import defaultSettings from '@/config/settings.json';

interface AppState {
  title: string;
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

const useAppModel = createGlobalState(() => {
  const state = reactive<AppState>({ ...defaultSettings });

  const patch = (s: Partial<AppState>) => {
    Object.keys(s).forEach(k => {
      state[k] = s[k];
    });
  };

  const toggleTheme = (dark: boolean) => {
    if (dark) {
      state.theme = 'dark';
      document.body.setAttribute('arco-theme', 'dark');
      return;
    }

    state.theme = 'light';
    document.body.removeAttribute('arco-theme');
  };

  const toggleSettingVisible = () => {
    state.settingVisible = !state.settingVisible;
  };

  return { state, patch, toggleTheme, toggleSettingVisible };
});

export type { AppState };

export { useAppModel };
