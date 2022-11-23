<script setup lang="ts">
import {
  Card,
  Row,
  Col,
  Select,
  Button,
  Descriptions,
  Space,
  FormItem,
  Form,
  Input,
  Checkbox,
  CardGrid,
  CheckboxGroup,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';



//表单数据
const FormData = reactive({
  Group: '',
  Artifact: '',
  Name: '',
  Describe: '',
  package: '',
});
const handleSubmit=()=>{
  
}
</script>

<template>
  <Descriptions title="Lanuage" size="large">
    <CheckboxGroup>
      <Checkbox value="1">JAVA</Checkbox>
       <Checkbox value="2">C++</Checkbox>
    </CheckboxGroup>
  </Descriptions>
  <Descriptions title="Request" size="large">
    <CheckboxGroup>
      <Checkbox value="3">resultful</Checkbox>
      <Checkbox value="4">gRPC</Checkbox>
    </CheckboxGroup>
  </Descriptions>
  <Descriptions title="Project Metadata" size="large">
    <Form :model="FormData" class="form" label-align="left" layout="vertical"  @submit="handleSubmit">
      <FormItem field="Group" label="Group" :rules="[{ required: true, message: '必填' }]">
        <Select></Select>
      </FormItem>

      <FormItem field="Artifact" label="Artifact" :rules="[{ required: true, message: '必填' }]">
        <Input v-model="FormData.Artifact" placeholder="Please enter something" />
      </FormItem>

      <FormItem field="Name" label="Name" :rules="[{ required: true, message: '必填' }]">
        <Input v-model="FormData.Name" placeholder="Please enter something" />
      </FormItem>
      <FormItem field="Describe" label="Describe">
        <Input v-model="FormData.Describe" placeholder="Please enter something" />
      </FormItem>
      <FormItem field="package" label="package name">
        <Input v-model="FormData.package" placeholder="Please enter something" />
      </FormItem>
      <FormItem>
        <Button html-type="submit" type="primary">提交</Button>
      </FormItem>
    </Form>
  </Descriptions>
</template>

<style lang="less" scoped></style>
