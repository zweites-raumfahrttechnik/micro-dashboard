<script setup lang="ts">
import { Drawer, Tree, Row, Col, Card, Divider } from '@arco-design/web-vue';

import { useDrawerStore } from '../hooks';

import { Codemirror } from 'vue-codemirror';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';

const { drawerVisible } = useDrawerStore()!;

const handleDisableInstance = () => {
  drawerVisible.value = false;
};

const treeData = [
  {
    title: '.file1',
    key: '0-0',
  },
  {
    title: 'file2',
    key: '0-1',
  },
  {
    title: 'src',
    key: '0-2',
    children: [
      {
        title: 'main',
        key: '0-2-0',
        children: [
          { title: 'leaf1', key: '0-2-0-0' },
          { title: 'leaf2', key: '0-2-0-1' },
        ],
      },
      {
        title: 'test',
        key: '0-2-1',
        children: [
          { title: 'leaf3', key: '0-2-1-0' },
          { title: 'leaf4', key: '0-2-1-1' },
        ],
      },
    ],
  },
];

const selectTreeKey = ref([]);

const treeSelect = () => {
  //获取文件并绑定至codemirror
  code.value = '选中的key为' + selectTreeKey.value + '新内容';
};

const code = ref(`console.log('Hello, world!')`);
const extensions = [java(), cpp()];
</script>

<template>
  <Drawer
    placement="bottom"
    height="100%"
    :visible="drawerVisible"
    :footer="false"
    @cancel="handleDisableInstance"
  >
    <Card :bordered="false">
      <template #title>代码详情</template>
      <Row :gutter="12">
        <Col :span="2">
          <Tree
            v-model:selected-keys="selectTreeKey"
            :default-selected-keys="[0 - 0]"
            :data="treeData"
            :show-line="true"
            @select="treeSelect"
          />
          {{ selectTreeKey }}
        </Col>

        <Col class="line" :span="1">
          <Divider direction="vertical" :style="{ height: '100%' }" />
        </Col>

        <Col :span="10">
          <codemirror
            v-model="code"
            placeholder="Code goes here..."
            :style="{ height: '800px', width: '1500px' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
          >
          </codemirror>
        </Col>
      </Row>
    </Card>
  </Drawer>
</template>
<style lang="less" scoped>
.line {
  height: 750px;
  display: flex;
}
</style>
