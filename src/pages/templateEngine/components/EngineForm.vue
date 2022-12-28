<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Button,
  FormItem,
  Form,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Upload,
  RequestOption,
  UploadRequest,
} from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { UPLOAD_PROTO_URL } from '@/api/url';

interface FormDataType {
  type: number;
  protocol: number;
  name: string;
  filePath: string;
}

const { execute, abort: uploadAbort } = useAxios<ResponseWrap<string>>(
  UPLOAD_PROTO_URL,
  { method: 'POST' },
  instance,
  {
    immediate: false,
  },
);

const formData = reactive<FormDataType>({
  type: 0,
  protocol: 1,
  name: '',
  filePath: '',
});

const protocol = ref<[number]>([1]);

watch(
  () => protocol.value,
  val => {
    if (val.indexOf(0) !== -1) {
      formData.protocol = 0;
    } else {
      formData.protocol = 1;
    }
  },
);

const disableSubmit = computed(() => {
  if (formData.protocol === 0 && formData.filePath === '') {
    return true;
  }

  return false;
});

const handleCustomRequest = (options: RequestOption): UploadRequest => {
  const data = new FormData();
  data.append('files', options.fileItem.file as File);

  execute({
    data,
    onUploadProgress: (event: ProgressEvent) => {
      if (event.lengthComputable) {
        options.onProgress(event.loaded / event.total, event);
      }
    },
  }).then(
    resp => {
      formData.filePath = resp.data.value?.data as string;
      options.onSuccess();
    },
    () => {
      options.onError();
    },
  );

  return { abort: uploadAbort };
};

const handleSubmit = () => {
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(formData)) {
    params.set(key, '' + val);
  }

  const a = document.createElement('a');
  a.download = 'demo.zip';
  a.href = `/api/v1/code/gen?${params.toString()}`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
</script>

<template>
  <Form :model="formData" class="form" @submit="handleSubmit">
    <FormItem field="name" label="模板名称" :rules="[{ required: true, message: '必填' }]">
      <Input v-model="formData.name" placeholder="模板名称（英文）" />
    </FormItem>

    <FormItem field="type" label="编程语言" required>
      <RadioGroup v-model="formData.type">
        <Radio :value="0">JAVA</Radio>
        <Radio :value="1">C++</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem field="protocol" label="请求协议" required>
      <CheckboxGroup v-model="protocol">
        <Checkbox :value="1">Restful</Checkbox>
        <Checkbox :value="0">gRPC</Checkbox>
      </CheckboxGroup>
    </FormItem>

    <FormItem v-if="formData.protocol === 0" label="上传proto文件" required>
      <Upload :draggable="true" :limit="1" :custom-request="handleCustomRequest" />
    </FormItem>

    <FormItem>
      <Button html-type="submit" type="primary" class="button" :disabled="disableSubmit">
        提交
      </Button>
    </FormItem>
  </Form>
</template>

<style lang="less" scoped>
.form {
  width: 800px;
}
</style>
