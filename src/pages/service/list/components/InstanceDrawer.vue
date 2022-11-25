<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Drawer,
  Row,
  Col,
  Table,
  TableColumn,
  Popconfirm,
  Button,
  Card,
  Divider,
} from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { THEME_INSTANCE_URL, THEME_DETAIL_URL } from '@/api/url';
import { ServiceDetail } from '@/api/types';

import { useDrawerStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { drawerVisible, selectService } = useDrawerStore()!;

const handleDisableInstance = () => {
  drawerVisible.value = false;
};

const { data, execute, isLoading } = useAxios<ResponseWrap<ServiceDetail>>(
  THEME_DETAIL_URL,
  {},
  instance,
  {
    immediate: false,
  },
);

const { isLoading: deleteLoading, execute: deleteExecute } = useAxios(
  THEME_INSTANCE_URL,
  {
    method: 'DELETE',
  },
  instance,
  { immediate: false },
);

watch(
  () => selectService.value,
  val => {
    execute({ params: { uuid: val } });
  },
);

const handleDeleteInstance = async (uuid: string) => {
  await deleteExecute({ data: { uuid } });

  execute();
};
</script>

<template>
  <Drawer
    placement="right"
    width="800px"
    :visible="drawerVisible"
    :footer="false"
    @cancel="handleDisableInstance"
  >
    <template #title>服务详情</template>

    <Row justify="center">
      <Col :span="20">
        <Card title="实例详情">
          <Table
            row-key="uuid"
            :bordered="false"
            :data="data?.data?.instance.data"
            :pagination="false"
            :loading="deleteLoading || isLoading"
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
        </Card>
      </Col>
    </Row>

    <Divider />

    <Row justify="center">
      <Col :span="20">
        <Card title="可访问服务">
          <Table
            row-key="uuid"
            :bordered="false"
            :data="data?.data?.visited.data"
            :pagination="false"
            :loading="deleteLoading || isLoading"
          >
            <template #columns>
              <TableColumn title="被访问服务名称" data-index="name" />

              <TableColumn title="服务创建者">
                <template #cell="{ record }">
                  {{ record.user.nickName }}
                </template>
              </TableColumn>

              <TableColumn title="服务创建时间" data-index="createAt" />

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
        </Card>
      </Col>
    </Row>
  </Drawer>
</template>
