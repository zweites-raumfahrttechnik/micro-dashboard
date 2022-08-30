import { useAppModel } from '@/model';

const useAppModelMap = () => {
  const appModel = useAppModel();

  const hideMenu = computed(() => appModel.hideMenu);
  const navbar = computed(() => appModel.navbar);
  const device = computed(() => appModel.device);
  const theme = computed(() => appModel.theme);
  const menuCollapse = computed(() => appModel.menuCollapse);

  return {
    hideMenu,
    navbar,
    device,
    theme,
    menuCollapse,
    $patch: appModel.$patch,
    toggleTheme: appModel.toggleTheme,
  };
};

export default useAppModelMap;
