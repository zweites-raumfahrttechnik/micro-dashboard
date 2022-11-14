import { useAxios } from '@vueuse/integrations/useAxios';

import { instance, ResponseWrap } from '@/api';
import { THEME_URL } from '@/api/url';
import { ThemeListData, ThemeListItem } from '@/api/types';

const useThemeList = () => {
  const theme = ref<ThemeListItem[]>([]);

  // 分页参数
  const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 15,
  });

  // 请求服务列表
  const { data, isLoading, execute } = useAxios<ResponseWrap<ThemeListData>>(
    THEME_URL,
    {
      method: 'GET',
      params: {
        pg: pagination.current,
        size: pagination.pageSize,
      },
    },
    instance,
  );

  watch(
    () => data.value?.data?.data,
    newVal => {
      const tmp = new Set(theme.value);
      newVal?.forEach(item => {
        tmp.add(item);
      });

      theme.value = Array.from(tmp);
    },
  );

  const selectLoadMore = () => {
    pagination.current++;

    execute({
      params: {
        pg: pagination.current,
        size: pagination.pageSize,
      },
    });
  };

  return { theme, selectLoadMore, isLoading };
};

export { useThemeList };
