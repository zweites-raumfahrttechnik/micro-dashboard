import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { CONFIG_APPROVE_URL } from '@/api/url';
import { ConfigListData } from '@/api/types';

import { SearchParams, SearchFormData } from './types';

const [useTableProvideStore, useTableStore] = createInjectionState(() => {
  // 表单实例
  const searchFormRef = ref<FormInstance>();

  // 数据绑定
  const searchFormData = reactive<SearchFormData>({
    dataId: '',
    createBy: '',
    createAt: [],
  });

  // 分页参数
  const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 15,
  });

  // 请求服务列表
  const { data, isLoading, execute } = useAxios<ResponseWrap<ConfigListData>>(
    CONFIG_APPROVE_URL,
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

    if (searchFormData.dataId && searchFormData.dataId !== '') {
      params.dataId = searchFormData.dataId;
    }

    if (searchFormData.createBy && searchFormData.createBy !== '') {
      params.createBy = searchFormData.createBy;
    }

    if (searchFormData.createAt && searchFormData.createAt.length === 2) {
      params.startAt = searchFormData.createAt[0];
      params.endAt = searchFormData.createAt[1];
    }

    if (
      (searchFormData.status && searchFormData.status === '0') ||
      searchFormData.status === '1' ||
      searchFormData.status === '2'
    ) {
      params.status = searchFormData.status;
    }

    if (
      (searchFormData.type && searchFormData.type === '1') ||
      searchFormData.type === '2' ||
      searchFormData.type === '3' ||
      searchFormData.type === '4'
    ) {
      params.type = searchFormData.type;
    }

    if (
      (searchFormData.configType && searchFormData.configType === '1') ||
      searchFormData.configType === '2' ||
      searchFormData.configType === '3' ||
      searchFormData.configType === '4'
    ) {
      params.configType = searchFormData.configType;
    }

    execute({ params });
  };

  return { searchFormRef, searchFormData, tableData, isLoading, pagination, refreshList };
});

export { useTableProvideStore, useTableStore };
