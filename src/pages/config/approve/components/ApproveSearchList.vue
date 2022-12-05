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

import { useTableStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
            <FormItem field="dataId" label="配置文件名">
              <Input v-model="searchFormData.dataId" placeholder="请输入配置文件名" />
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem field="createBy" label="创建者">
              <Input v-model="searchFormData.createBy" placeholder="请输入创建者" />
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem field="createAt" label="创建时间">
              <RangePicker v-model="searchFormData.createAt" style="width: 100%" />
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem field="status" label="审批状态">
              <Select v-model="searchFormData.status">
                <Option value="0">待审批</Option>
                <Option value="1">已通过</Option>
                <Option value="2">已拒绝</Option>
              </Select>
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem field="configType" label="配置类型">
              <Select v-model="searchFormData.configType">
                <Option value="1">公有配置</Option>
                <Option value="2">私有配置</Option>
              </Select>
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem field="type" label="类型">
              <Select v-model="searchFormData.type">
                <Option value="1">修改申请</Option>
                <Option value="2">删除申请</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>

    <Divider style="height: 85px" direction="vertical" />

    <Col flex="86px">
      <Space direction="vertical" align="center" :size="18">
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
