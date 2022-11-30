<script setup lang="ts">
import {
  Button,
  Descriptions,
  FormItem,
  Form,
  Input,
  Radio,
  RadioGroup,
} from '@arco-design/web-vue';

import { useTableStore } from '../hooks';

const { FormData, selectedKeys } = useTableStore()!;

const handleSubmit = () => {
  FormData.selectedKeys = selectedKeys;

  //上传元数据
  console.log(
    '上传元数据' +
      '\n' +
      FormData.Language +
      '\n' +
      FormData.Request +
      '\n' +
      FormData.Group +
      '\n' +
      FormData.Artifact +
      '\n' +
      FormData.Name +
      '\n' +
      FormData.Describe +
      '\n' +
      FormData.package,
    '\n' + FormData.selectedKeys,
  );
};
</script>

<template>
  <Descriptions title="项目元数据" size="large">
    <Form :model="FormData" class="form" layout="vertical" @submit="handleSubmit">
      <FormItem field="Language" label="编程语言">
        <RadioGroup v-model="FormData.Language">
          <Radio value="1">JAVA</Radio>
          <Radio value="2">C++</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem field="Request" label="请求协议">
        <RadioGroup v-model="FormData.Request">
          <Radio value="1">resultful</Radio>
          <Radio value="2">gRPC</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem field="Group" label="组织(Group)" :rules="[{ required: true, message: '必填' }]">
        <Input v-model="FormData.Group" placeholder="Please enter something" />
      </FormItem>

      <FormItem
        field="Artifact"
        label="项目名称(Artifact)"
        :rules="[{ required: true, message: '必填' }]"
      >
        <Input v-model="FormData.Artifact" placeholder="Please enter something" />
      </FormItem>

      <FormItem field="Name" label="类名(Name)" :rules="[{ required: true, message: '必填' }]">
        <Input v-model="FormData.Name" placeholder="Please enter something" />
      </FormItem>
      <FormItem
        field="Describe"
        label="描述(Describe)"
        :rules="[{ required: true, message: '必填' }]"
      >
        <Input v-model="FormData.Describe" placeholder="Please enter something" />
      </FormItem>
      <FormItem
        field="package"
        label="包名(package name)"
        :rules="[{ required: true, message: '必填' }]"
      >
        <Input v-model="FormData.package" placeholder="Please enter something" />
      </FormItem>
      <FormItem>
        <Button html-type="submit" type="primary" class="button">提交</Button>
      </FormItem>
    </Form>
  </Descriptions>
</template>

<style lang="less" scoped>
.button {
  position: relative;
  left: 90%;
}
</style>
