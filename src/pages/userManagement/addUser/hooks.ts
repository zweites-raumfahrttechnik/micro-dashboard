import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { USER_AUTHORIZATION_URL } from '@/api/url';
import { AuthListData } from '@/api/types';

const [useFormProvideStore, useFormStore] = createInjectionState(() => {
  // 表单实例
  const UserInfoUpdateFormRef = ref<FormInstance>();

  // 分页参数
  const pagination = reactive<{ current: number; pageSize: number }>({
    current: 1,
    pageSize: 15,
  });

  // 请求服务列表
  const { data, isLoading, execute } = useAxios<ResponseWrap<AuthListData>>(
    USER_AUTHORIZATION_URL,
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
  const authData = computed(() => data.value?.data?.authdata || []);

  const selectLoadMore = () => {
    pagination.current++;

    execute({
      params: {
        pg: pagination.current,
        size: pagination.pageSize,
      },
    });
  };

  return { isLoading, authData, UserInfoUpdateFormRef, selectLoadMore };
});

export { useFormProvideStore, useFormStore };
