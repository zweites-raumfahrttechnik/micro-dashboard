<script setup lang="ts">
import { Form, FormItem, Row, Col, Input, Space, Divider, Button } from '@arco-design/web-vue';

import { useTableStore } from '../hooks';

const { searchFormRef, isLoading, searchFormData, pagination, refreshList } = useTableStore()!;

// 搜索按钮点击事件
const handleSearch = () => {
  refreshList();
};

// 重置 form 表单
const handleFromReset = () => {
  searchFormRef.value?.resetFields();

  if (pagination.current !== 1) {
    pagination.current = 1;
  }

  refreshList();
};
</script>

<template>
  <Row>
    <Col :flex="1">
      <Form
        ref="searchFormRef"
        :model="searchFormData"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <Row :gutter="16">
          <Col :span="8">
            <FormItem field="systemname" label="系统名">
              <Input v-model="searchFormData.systemname" placeholder="请输入系统名" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>

    <Divider style="height: 34px" direction="vertical" />

    <Col flex="195px">
      <Space :size="18">
        <Button type="primary" :loading="isLoading" @click="handleSearch">
          <template #icon>
            <IconSearch />
          </template>
          搜索
        </Button>
        <Button @click="handleFromReset">
          <template #icon>
            <IconRefresh />
          </template>
          重置
        </Button>
      </Space>
    </Col>
  </Row>
</template>
