import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { THEME_APPROVE_URL } from '@/api/url';
import { ThemeListData } from '@/api/types';

import { SearchParams, SearchFormData } from './types';

const [useTableProvideStore, useTableStore] = createInjectionState(() => {
  // 表单实例
  const searchFormRef = ref<FormInstance>();

  // 数据绑定
  const searchFormData = reactive<SearchFormData>({
    name: '',
    user: '',
    createAt: [],
  });

  // 分页参数
  const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 15,
  });

  // 请求服务列表
  const { data, isLoading, execute } = useAxios<ResponseWrap<ThemeListData>>(
    THEME_APPROVE_URL,
    {
      method: 'GET',
      params: {
        pg: pagination.current,
        size: pagination.pageSize,
      },
    },
    instance,
  );

  // 服务表格数据计算属性
  const tableData = computed(() => data.value?.data?.data || []);

  // 变更分页参数
  watch(
    () => data.value?.data?.count,
    newVal => {
      pagination.total = newVal;
    },
  );

  // 监听分页参数变化, 发起请求
  watch(
    () => pagination.current,
    () => refreshList(),
  );

  // 刷新列表
  const refreshList = () => {
    const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };

    if (searchFormData.name && searchFormData.name !== '') {
      params.name = searchFormData.name;
    }

    if (searchFormData.user && searchFormData.user !== '') {
      params.user = searchFormData.user;
    }

    if (searchFormData.createAt && searchFormData.createAt.length === 2) {
      params.startAt = searchFormData.createAt[0];
      params.endAt = searchFormData.createAt[1];
    }

    if (
      (searchFormData.status && searchFormData.status === 0) ||
      searchFormData.status === 1 ||
      searchFormData.status === 2
    ) {
      params.status = searchFormData.status;
    }

    execute({ params });
  };

  return { searchFormRef, searchFormData, tableData, isLoading, pagination, refreshList };
});

export { useTableProvideStore, useTableStore };
