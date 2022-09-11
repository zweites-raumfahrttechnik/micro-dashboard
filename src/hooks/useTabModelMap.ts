import { useTabModel } from '@/model';

const useTabModelMap = () => {
  const tabModel = useTabModel();

  const tabList = computed(() => tabModel.tabList);
  const cacheList = computed(() => tabModel.cacheList);

  return {
    tabList,
    cacheList,
    updateTabList: tabModel.updateTabList,
    deleteTab: tabModel.deleteTab,
  };
};

export default useTabModelMap;
