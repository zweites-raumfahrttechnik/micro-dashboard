<script setup lang="ts">
import { Card, Space, Button, Modal, List, ListItem, ListItemMeta } from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import ModalTable from './DependencyModal.vue';

import { useTableStore } from '../hooks';

const { selectedKeys } = useTableStore()!;

const addVisible = ref(false);
const handleAdd = () => {
  addVisible.value = true;
};

const ListData = reactive({
  content: [{ name: '和1' }, { name: '和2' }, { name: '和3' }],
});

const handleDelete = (item: any) => {
  selectedKeys.value.splice(selectedKeys.value.indexOf(item), 1);
};
</script>

<template>
  <Space direction="vertical" fill>
    <Card title="Dependencies" :style="{ width: '100%' }" :bordered="false">
      <template #extra>
        <Button type="primary" @click="handleAdd">添加依赖</Button>
      </template>
    </Card>
    <List :data="selectedKeys" :style="{ width: '100%' }" style="height: 40%">
      <template #item="{ item }">
        <ListItem>
          <ListItemMeta :title="item"></ListItemMeta>
          <template #actions>
            <Button
              :style="{ marginLeft: '10px' }"
              shape="circle"
              status="success"
              @click="handleDelete(item)"
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

<style lang="less" scoped>
.footer {
  float: right;
  position: relative;
  top: 60%;
}
</style>
