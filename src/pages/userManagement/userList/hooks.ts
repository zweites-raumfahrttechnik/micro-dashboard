import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { USER_URL, USER_AUTHORIZATION_URL, SOME_USER_AUTHORIZATION_URL } from '@/api/url';
import { UserListData, AuthListData, UserAuthInfoData } from '@/api/types';

import { SearchParams, UserUpdateInfo } from './types';

const [useTableProvideStore, useTableStore] = createInjectionState(() => {
  // 表单实例
  const searchFormRef = ref<FormInstance>();

  // 数据绑定
  const searchFormData = reactive({
    username: '',
  });

  // 分页参数
  const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 15,
  });

  // 请求服务列表
  const { data, isLoading, execute } = useAxios<ResponseWrap<UserListData>>(
    USER_URL,
    {
      method: 'GET',
      params: {
        username: '',
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
    const params: SearchParams = {
      username: '',
      pg: pagination.current,
      size: pagination.pageSize,
    };

    if (searchFormData.username && searchFormData.username !== '') {
      params.username = searchFormData.username;
    }
    execute({ params });
  };

  return { searchFormRef, searchFormData, tableData, isLoading, pagination, refreshList };
});

const [useInfoUpdateDrawerProvideStore, useInfoUpdateDrawerStore] = createInjectionState(() => {
  const useInfoUpdateDrawerVisible = ref(false);

  const selectUser = reactive<UserUpdateInfo>({});

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
  const authData = computed(() => data.value?.data?.data || []);

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
    useInfoUpdateDrawerVisible,
    selectUser,
    isLoading,
    authData,
    UserInfoUpdateFormRef,
    selectLoadMore,
  };
});

const [useInfoDrawerProvideStore, useInfoDrawerStore] = createInjectionState(() => {
  const useInfoDrawVisible = ref(false);

  const selectUuid = ref<string>();

  const { data, isLoading, execute } = useAxios<ResponseWrap<UserAuthInfoData>>(
    SOME_USER_AUTHORIZATION_URL,
    {
      method: 'GET',
    },
    instance,
  );

  const userAuthData = computed(() => data.value?.data?.authList);

  watch(
    () => selectUuid.value,
    () =>
      execute({
        params: {
          uuid: selectUuid.value,
        },
      }),
  );

  return { useInfoDrawVisible, selectUuid, isLoading, userAuthData };
});

export {
  useTableProvideStore,
  useTableStore,
  useInfoUpdateDrawerProvideStore,
  useInfoUpdateDrawerStore,
  useInfoDrawerProvideStore,
  useInfoDrawerStore,
};
