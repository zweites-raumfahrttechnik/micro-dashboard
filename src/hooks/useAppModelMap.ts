import { useAppModel } from '@/model';

const useAppModelMap = () => {
  const appModel = useAppModel();

  const navbar = computed(() => appModel.navbar);
  const device = computed(() => appModel.device);
  const theme = computed(() => appModel.theme);
  const menu = computed(() => appModel.menu);
  const hideMenu = computed(() => appModel.hideMenu);
  const menuCollapse = computed(() => appModel.menuCollapse);
  const menuWidth = computed(() => appModel.menuWidth);

  return {
    navbar,
    device,
    theme,
    menu,
    hideMenu,
    menuCollapse,
    menuWidth,
    $patch: appModel.$patch,
    toggleTheme: appModel.toggleTheme,
  };
};

export default useAppModelMap;
