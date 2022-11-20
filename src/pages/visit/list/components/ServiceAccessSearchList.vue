<script setup lang="ts">
import {
  Form,
  FormItem,
  Row,
  Col,
  Input,
  RangePicker,
  Space,
  Divider,
  Button,
  Select,
  Option,
} from '@arco-design/web-vue';

import { useTableStore } from './hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { ServiceVisitFormRef, isLoading, ServiceAccessFormData, pagination, refreshList } =
  useTableStore()!;

// 搜索按钮点击事件
const handleSearch = () => {
  refreshList();
};

// 重置 form 表单
const handleFromReset = () => {
  ServiceVisitFormRef.value?.resetFields();

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
        ref="ServiceVisitFormRef"
        :model="ServiceAccessFormData"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <Row :gutter="16">
          <Col :span="8">
            <FormItem field="name" label="申请记录">
              <Input v-model="ServiceAccessFormData.name" placeholder="请输入申请记录" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem field="status" label="申请审批状态">
              <Select v-model="ServiceAccessFormData.status" placeholder="请选择服务申请审批状态">
                <Option value="1">待批准</Option>
                <Option value="2">已批准</Option>
                <Option value="3">已拒绝</Option>
              </Select>
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem field="userid" label="创建者id">
              <Input v-model="ServiceAccessFormData.userid" placeholder="请输入创建者id" />
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem field="visitor" label="申请服务">
              <Input v-model="ServiceAccessFormData.visitor" placeholder="请输入申请服务名称" />
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem field="createAt" label="申请时间">
              <RangePicker v-model="ServiceAccessFormData.createAt" />
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
