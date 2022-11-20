import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { VISIT_URL } from '@/api/url';
import { VisitListData } from '@/api/types';

import { AddServiceAccessFormData, DelServiceAccessFormData } from './types';

const [useTableProvideStore, useTableStore] = createInjectionState(() => {
  // 表单实例
  const AddServiceAccessFormRef = ref<FormInstance>();
  const DelServiceAccessFormRef = ref<FormInstance>();

  // 数据绑定
  const AddServiceAccessFormData = reactive<AddServiceAccessFormData>({
    name: '',
    visitor: '',
    visited: [],
  });

  const DelServiceAccessFormData = reactive<DelServiceAccessFormData>({
    visitor: '',
    visited: [],
  });

  // 分页参数
  const pagination = reactive<{ current: number; pageSize: number }>({
    current: 1,
    pageSize: 15,
  });

  // 请求服务列表
  const { data, isLoading, execute } = useAxios<ResponseWrap<VisitListData>>(
    VISIT_URL,
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

  const selectLoadMore = () => {
    pagination.current++;

    execute({
      params: {
        pg: pagination.current,
        size: pagination.pageSize,
      },
    });
  };

  return {
    AddServiceAccessFormRef,
    DelServiceAccessFormRef,
    AddServiceAccessFormData,
    DelServiceAccessFormData,
    isLoading,
    tableData,
    selectLoadMore,
  };
});

export { useTableProvideStore, useTableStore };
