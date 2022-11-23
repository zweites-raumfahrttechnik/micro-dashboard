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
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import ModalTable from './Modal.vue';
import { useTableStore } from './hooks';

const { tableData, ListData } = useTableStore()!;

const addVisible = ref(false);
const handleAdd = () => {
  addVisible.value = true;
};
console.log(ListData);
</script>

<template>
  <Space direction="vertical" fill>
    <List :max-height="240" :scrollbar="true" :bordered="false">
      <template #header>
        <Row :gutter="10">
          <Col :span="6">Dependencies</Col>
          <Col :span="6"></Col>
          <Col :span="12"><Button @click="handleAdd" type="primary">ADD DEPENENECIES</Button></Col>
        </Row>
      </template>
         <ListItem v-for="item of ListData" size="large">{{ item.templateName }}</ListItem>  
    </List>
  </Space>
  <Modal v-model:visible="addVisible" :footer="false">
    <template #title> Dependencies </template>
    <ModalTable />
  </Modal>
</template>
