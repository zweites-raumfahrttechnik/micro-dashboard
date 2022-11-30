import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { TEMPLATE_LIST_URL } from '@/api/url';
import { TemplateListData } from '@/api/types';
import { reactive, ref } from 'vue';

const [useTableProvideStore, useTableStore] = createInjectionState(() => {
  // 请求服务列表
  const { data, isLoading, execute } = useAxios<ResponseWrap<TemplateListData>>(
    TEMPLATE_LIST_URL,
    {
      method: 'GET',
    },
    instance,
  );

  // 服务表格数据计算属性
  const tableData = computed(() => data.value?.data?.data || []);

  const selectedKeys = ref<any>([]);

  //表单数据
  const FormData = reactive({
    Language: '1',
    Request: '1',
    Group: 'com.example',
    Artifact: 'demo',
    Name: 'demo',
    Describe: 'Demo project for......',
    package: 'com.example.demo',
    selectedKeys: [],
  });

  return { tableData, isLoading, selectedKeys, FormData };
});
const [useDrawerProvideStore, useDrawerStore] = createInjectionState(() => {
  const drawerVisible = ref(false);

  return { drawerVisible };
});
export { useTableProvideStore, useTableStore, useDrawerProvideStore, useDrawerStore };
