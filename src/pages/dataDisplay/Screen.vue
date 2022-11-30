<script lang="ts" setup>
import { Select, Option, Card, Row, Col, Form, FormItem, Space } from '@arco-design/web-vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { BorderBox8 as DvBorderBox8 } from '@kjgl77/datav-vue3';
import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';
import { GetListData, GetListDataItem } from '@/api/types';

import PageContainer from '@/components/PageContainer.vue';

import ChainChart from './components/ChainChart.vue';
import OccupyChart from './components/OccupyChart.vue';
import ConcurrentChart from './components/ConcurrentChart.vue';

const form = reactive<{ type: number; uuid: string; pg: number }>({ type: 1, uuid: '', pg: 1 });
const dbs = ref<GetListDataItem[]>([]);

const {
  data: listData,
  isLoading: listLoading,
  execute: listExec,
} = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  { params: { pg: form.pg, size: 50, type: form.type } },
  instance,
  {
    immediate: false,
  },
);

watch(
  () => listData.value?.data?.data,
  newVal => {
    const tmp = new Set(dbs.value);
    newVal?.forEach(item => {
      tmp.add(item);
    });

    dbs.value = Array.from(tmp);
    if (form.uuid === '' && dbs.value.length != 0) {
      form.uuid = dbs.value[0].uuid;
    }
  },
);

watch(
  () => form.type,
  () => {
    form.pg = 1;
    form.uuid = '';
    dbs.value = [];

    listExec({ params: { pg: form.pg, size: 50, type: form.type } });
  },
);

// watch(
//   () => form.uuid,
//   () => {},
// );

onMounted(() => {
  listExec();
});

const selectLoadMore = () => {
  form.pg++;
  listExec({
    params: {
      pg: form.pg,
      size: 50,
      type: form.type,
    },
  });
};
</script>

<template>
  <PageContainer>
    <div demo-bg>
      <DvBorderBox8 :dur="5" style="width: 1600px; height: 900px;">
        <div dv-bg>
          <Space direction="vertical" :size="16">
            <Card class="general-card" :bordered="false">
              <template #title>选择服务</template>

              <Form :model="form">
                <Row :gutter="16" justify="space-around">
                  <Col :span="10">
                    <FormItem label="选择服务类型">
                      <Select v-model="form.type">
                        <Option :value="1">MySQL</Option>
                        <Option :value="2">达梦数据库</Option>
                        <Option :value="3">金仓数据库</Option>
                        <Option :value="4">Redis</Option>
                        <Option :value="5">MongoDB</Option>
                        <Option :value="6">Elasticsearch</Option>
                      </Select>
                    </FormItem>
                  </Col>

                  <Col :span="10">
                    <FormItem label="选择配置" :virtual-list-props="{ height: 300 }">
                      <Select
                        v-model="form.uuid"
                        :loading="listLoading"
                        @dropdown-reach-bottom="selectLoadMore"
                      >
                        <Option v-for="item in dbs" :key="item.uuid" :value="item.uuid">
                          {{ item.ip }}:{{ item.port }}
                        </Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Card>

            <ChainChart :uuid="form.uuid" />

            <OccupyChart :uuid="form.uuid" />

            <ConcurrentChart :uuid="form.uuid" />
          </Space>
        </div>
      </DvBorderBox8>
    </div>
  </PageContainer>
</template>
