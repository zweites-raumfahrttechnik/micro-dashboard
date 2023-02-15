<script setup lang="ts">
import { Drawer, Row, Col, Tag, Table, TableColumn } from '@arco-design/web-vue';

import { useInfoDrawerStore } from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { useInfoDrawVisible, isLoading, userAuthData } = useInfoDrawerStore()!;

const handleDisableInstance = () => {
  useInfoDrawVisible.value = false;
};
</script>

<template>
  <Drawer
    placement="right"
    width="400px"
    :visible="useInfoDrawVisible"
    :footer="false"
    @cancel="handleDisableInstance"
  >
    <template #title>用户权限</template>
    <Row justify="center">
      <Col :span="20">
        <Table row-key="system" :bordered="false" :data="userAuthData" :loading="isLoading">
          <template #columns>
            <TableColumn title="系统名称" data-index="system" />
            <TableColumn title="用户角色" data-index="role">
              <template #cell="{ record }">
                <Tag v-if="record.role === 0" color="green"><span>普通用户</span></Tag>
                <Tag v-else-if="record.role === 1" color="red"><span>管理员</span></Tag>
              </template>
            </TableColumn>
          </template>
        </Table>
      </Col>
    </Row>
  </Drawer>
</template>
