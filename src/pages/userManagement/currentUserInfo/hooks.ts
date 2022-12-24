import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { USER_INFO_URL } from '@/api/url';
import { CurrentUserInfo } from '@/api/types';
import { ref, reactive } from 'vue';

const [useTableProvideStore, useTableStore] = createInjectionState(() => {
  // 表单实例
  const searchFormRef = ref<FormInstance>();

  // 数据绑定
  const searchFormData = reactive({
    systemname: '',
  });

  // 请求服务列表
  const { data, isLoading, execute } = useAxios<ResponseWrap<CurrentUserInfo>>(
    USER_INFO_URL,
    {
      method: 'GET',
    },
    instance,
  );

  const userdata = [
    { label: '昵称', value: '' },
    { label: '权限id', value: '' },
  ];
  // 服务表格数据计算属性
  watch(
    () => data.value?.data?.nickname,

    nickname => {
      userdata[0].value = nickname!;
    },
  );

  watch(
    () => data.value?.data?.auth,
    roles => {
      roles?.forEach(function (item) {
        userdata[1].value += item.role.toString() + ' ';
      });
    },
  );

  return { searchFormRef, searchFormData, userdata, isLoading, execute };
});

export { useTableProvideStore, useTableStore };
