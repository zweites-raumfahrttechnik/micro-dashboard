<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Drawer, Row, Col, Table, TableColumn, Popconfirm, Button } from '@arco-design/web-vue';

import { instance } from '@/api';
import { THEME_INSTANCE_URL } from '@/api/url';

import { useTableStore, useDrawerStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { tableData, refreshList } = useTableStore()!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { drawerVisible, selectService } = useDrawerStore()!;

const handleDisableInstance = () => {
  drawerVisible.value = false;
};

const { isLoading, execute } = useAxios(
  THEME_INSTANCE_URL,
  {
    method: 'DELETE',
  },
  instance,
  { immediate: false },
);

const serviceInstance = computed(
  () => tableData.value.find(item => item.uuid === selectService.value)?.instance || [],
);

const handleDeleteInstance = async (uuid: string) => {
  await execute({ data: { uuid } });

  handleDisableInstance();

  refreshList();
};
</script>

<template>
  <Drawer
    placement="bottom"
    height="600px"
    :visible="drawerVisible"
    :footer="false"
    @cancel="handleDisableInstance"
  >
    <template #title>服务实例列表</template>

    <Row justify="center">
      <Col :span="20">
        <Table
          row-key="uuid"
          :bordered="false"
          :data="serviceInstance"
          :pagination="false"
          :loading="isLoading"
        >
          <template #columns>
            <TableColumn title="实例运行IP" data-index="ip" />

            <TableColumn title="实例运行端口" data-index="port" />

            <TableColumn title="实例创建时间" data-index="createAt" />

            <TableColumn title="操作">
              <template #cell="{ record }">
                <Popconfirm
                  content="请确认是否删除此实例"
                  @ok="() => handleDeleteInstance(record.uuid)"
                >
                  <Button type="text" status="danger">删除</Button>
                </Popconfirm>
              </template>
            </TableColumn>
          </template>
        </Table>
      </Col>
    </Row>
  </Drawer>
</template>
