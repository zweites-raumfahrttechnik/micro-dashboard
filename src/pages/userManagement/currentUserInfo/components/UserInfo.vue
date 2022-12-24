<script lang="ts" setup>
import { Card, Descriptions, CardMeta, TypographyText, Tag, Button } from '@arco-design/web-vue';
import { IconCheckCircleFill } from '@arco-design/web-vue/es/icon';
import { useTableStore } from '../hooks';

const { userdata } = useTableStore()!;

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const handlePre = () => {
  emit('change-step', 0);
};
</script>

<template>
  <div>
    <Card class="card">
      <CardMeta>
        <template #title>
          <TypographyText style="margin-right: 10px"> 服务名称 </TypographyText>
          <Tag size="small" color="green">
            <template #icon>
              <IconCheckCircleFill />
            </template>
            <span>已登录</span>
          </Tag>
        </template>
        <template #description>
          <Descriptions
            style="margin-top: 16px"
            :data="userdata"
            layout="inline-horizontal"
            :column="2"
          >
          </Descriptions>
        </template>
      </CardMeta>

      <template #actions>
        <span class="icon-hover"
          ><Button size="small" type="outline" @click="handlePre">再次查看</Button></span
        >
      </template>
    </Card>
  </div>
</template>

<style lang="less" scoped>
.card {
  width: 300px;
  height: 150px;
}
</style>
