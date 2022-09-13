<script lang="ts" setup>
import { InputNumber, Switch } from '@arco-design/web-vue';
import { Option } from './props';

const props = defineProps<{ title: string; options: Option[] }>();
</script>

<template>
  <div class="container">
    <h5 class="title">{{ props.title }}</h5>

    <div v-for="item in props.options" :key="item.name" class="form-wrapper">
      <span>{{ item.name }}</span>
      <InputNumber
        v-if="item.type === 'number'"
        size="small"
        :style="{ width: '80px' }"
        :default-value="(item.value as number)"
        :disabled="item.disabled"
        @change="item.change"
      />
      <Switch
        v-else-if="item.type === 'switch'"
        size="small"
        :default-checked="(item.value as boolean)"
        :disabled="item.disabled"
        @change="item.change"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  margin-bottom: 24px;
}

.title {
  margin: 10px 0;
  padding: 0;
  font-size: 14px;
}

.form-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
}
</style>
