<script setup lang="ts">
import {
  Card,
  Row,
  Col,
  Descriptions,
  Space,
  FormItem,
  Form,
  Input,
  Select,
  Button,
  Modal,
  TableColumn,
  List,
  ListItem,
  ListItemMeta,
  TypographyText,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import ModalTable from './Modal.vue';

import { useTableStore } from './hooks';

const { tableData,listdata } = useTableStore()!;
console.log(listdata);
const addVisible = ref(false);

const handleAdd = () => {
  addVisible.value = true;
};

const ListData=reactive({
  content:[{name:'和1'},{name: '和2'},{name: '和3'}]
})

//splice(index,howmany,item1)
//从数组中删去元素或添加元素 
// ListData.content 更换listdata-->实现删除操作                                                                                                                                                                                                                                                                                                                  
const handleDelete = (index: number) => {
  listdata.splice(index, 1);
};
</script>

<template>
  <Space direction="vertical" fill>
    <Card title="Dependencies" :style="{ width: '100%' }" :bordered="false">
      <template #extra>
        <Button @click="handleAdd" type="primary">ADD DEPENENECIES</Button>
      </template>
    </Card>
    <List :data="listdata" :style="{ width: '100%' }">
      <template #item="{ item, index }">
        <ListItem>
          <ListItemMeta :title="item"></ListItemMeta>
          <template #actions>
            <Button
              @click="handleDelete(index)"
              :style="{ marginLeft: '10px' }"
              shape="circle"
              status="success"
            >
              <template #icon>
                <IconMinus />
              </template>
            </Button>
          </template>
        </ListItem>
      </template>
    </List>
  </Space>

  <Modal v-model:visible="addVisible" :footer="false">
    <template #title> Dependencies </template>
    <ModalTable />
  </Modal>
</template>
