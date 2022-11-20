import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { VISIT_URL } from '@/api/url';
import { VisitListData } from '@/api/types';

import { GetServiceAccessParams, ServiceAccessFormData } from './types';

const [useTableProvideStore, useTableStore] = createInjectionState(() => {
  // 表单实例
  const ServiceVisitFormRef = ref<FormInstance>();

  // 数据绑定
  const ServiceAccessFormData = reactive<ServiceAccessFormData>({
    name: '',
    status: '',
    userid: '',
    visitor: '',
    createAt: [],
  });

  // 分页参数
  const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
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
    const params: GetServiceAccessParams = { pg: pagination.current, size: pagination.pageSize };

    if (ServiceAccessFormData.name && ServiceAccessFormData.name !== '') {
      params.name = ServiceAccessFormData.name;
    }

    if (ServiceAccessFormData.status && ServiceAccessFormData.status !== '') {
      params.status = ServiceAccessFormData.status;
    }

    if (ServiceAccessFormData.userid && ServiceAccessFormData.userid !== '') {
      params.userid = ServiceAccessFormData.userid;
    }
    if (ServiceAccessFormData.status && ServiceAccessFormData.visitor !== '') {
      params.visitor = ServiceAccessFormData.visitor;
    }

    execute({ params });
  };

  return {
    ServiceVisitFormRef,
    ServiceAccessFormData,
    tableData,
    isLoading,
    pagination,
    refreshList,
  };
});

const [useModalProvideStore, useModalStore] = createInjectionState(() => {
  const modalVisible = ref(false);

  const approveForm = reactive<{
    selectService: string;
    approveState: string;
    approveMessage: string;
  }>({
    selectService: ' ',
    approveState: ' ',
    approveMessage: ' ',
  });

  const approveFormRef = ref<FormInstance>();

  return { modalVisible, approveForm, approveFormRef };
});

export { useTableProvideStore, useTableStore, useModalProvideStore, useModalStore };
