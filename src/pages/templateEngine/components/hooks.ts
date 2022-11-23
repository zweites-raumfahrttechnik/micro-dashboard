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
  //const tableData = computed(() => data.value?.data?.data || []);

  const tableData = ref<TemplateListItem[]>([]);

  //1.将申请的TableData数据填充到一个变量中
  //2.申请一个新的变量用于存放List表的数据
  //3.Table的row-key事件，用于删除Table数据，增加List数据
  //4.List的actions增加操作项删除,用于删除List数据，增加Table数据
  //考虑实时渲染问题

  //根据list数据变化，来判断是增加还是删除
  //list增加的情况下-->如果列表的值发生变化，则执行方法，给table数据中清除掉当前添加项
  //list删除的情况下-->如果列表的值发生变化，则执行方法，给table数据中增加当前删除项

  //第一步-->后端数据改变重新赋值
  watch(
    () => data.value?.data?.data,
    newValue => {
      //tmp为Set集合类型
      const tmp = new Set(tableData.value);
      //newVal为新值，监视数据的新值
      newValue?.forEach(item => {
        tmp.add(item);
      });
      //connections.value是一个数组类型
      tableData.value = Array.from(tmp);
    },
  );


  //第二步
  const ListData = ref<TemplateListItem[]>([]);
  //第三步
  const tmp = new Set(ListData.value);

  //点击table的行数据时触发-->取值-->从TableData中删除这行值

  const tagState=ref(false);
  const handleSelect = (row: any) => {

    tmp.add(row.templateName);
    console.log(Array.from(tmp))
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

  return { tableData, ListData, handleSelect };
});

const [useDrawerProvideStore, useDrawerStore] = createInjectionState(() => {
  const drawerVisible = ref(false);
  return { drawerVisible};
});

export { useTableProvideStore, useTableStore, useDrawerProvideStore, useDrawerStore };
