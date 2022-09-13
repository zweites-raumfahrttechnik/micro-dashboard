import { useAppModel } from '@/model';

const useAppModelMap = () => {
  const appModel = useAppModel();

  const navbar = computed(() => appModel.navbar);
  const tabbar = computed(() => appModel.tabbar);
  const device = computed(() => appModel.device);
  const theme = computed(() => appModel.theme);
  const menu = computed(() => appModel.menu);
  const hideMenu = computed(() => appModel.hideMenu);
  const menuCollapse = computed(() => appModel.menuCollapse);
  const menuWidth = computed(() => appModel.menuWidth);
  const footer = computed(() => appModel.footer);
  const settingVisible = computed(() => appModel.settingVisible);

  return {
    navbar,
    tabbar,
    device,
    theme,
    menu,
    hideMenu,
    menuCollapse,
    menuWidth,
    footer,
    settingVisible,
    $patch: appModel.$patch,
    toggleTheme: appModel.toggleTheme,
    toggleSettingVisible: appModel.toggleSettingVisible,
  };
};

export default useAppModelMap;
