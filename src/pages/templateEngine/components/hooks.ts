import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance, Row } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { TEMPLATE_LIST_URL } from '@/api/url';
import { TemplateListData, TemplateListItem } from '@/api/types';
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

  //const tableData = ref<TemplateListItem[]>([]);
  // watch(
  //   () => data.value?.data?.data,
  //   newValue => {
  //     //tmp为Set集合类型
  //     const tmp = new Set(tableData.value);
  //     //newVal为新值，监视数据的新值
  //     newValue?.forEach(item => {
  //       tmp.add(item);
  //     });
  //     //connections.value是一个数组类型
  //     tableData.value = Array.from(tmp);
  //   },
  // );
  const listdata: string[] = new Array();

  //点击table的行数据时触发-->取值-->从TableData中删除这行值
  const handleSelect = (row: any) => {
    listdata.push(row.templateName);

    if (row.status == 1) {
      row.status = 2;
      listdata.push(row.templateName);
    } else {
      row.status = 1;
    }
  };

  //watch监视TableData的变化
  // watch(
  //   () => tableData,
  //   () => {
  //     const keys=handleSelect(Row);
  //     tmp.add(keys);
  //     ListData.value = Array.from(tmp);
  //   },
  // );

  return { tableData, handleSelect,listdata };
});
const [useDrawerProvideStore, useDrawerStore] = createInjectionState(() => {
  const drawerVisible = ref(false);
  

  return { drawerVisible };
});
export { useTableProvideStore, useTableStore ,useDrawerProvideStore, useDrawerStore};
