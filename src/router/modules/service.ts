import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const service: RouteRecordRaw = {
  path: '/service',
  name: 'Service',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'add/service',
      name: 'AddService',
      component: () => import('@/pages/service/addService/AddService.vue'),
      meta: {
        requireAuth: true,
        locale: '添加服务',
      },
    },
    {
      path: 'list',
      name: 'ServiceList',
      component: () => import('@/pages/service/list/ServiceList.vue'),
      meta: {
        requireAuth: true,
        locale: '服务列表',
      },
    },
    {
      path: 'add/instance',
      name: 'AddInstance',
      component: () => import('@/pages/service/addInstance/AddInstance.vue'),
      meta: {
        requireAuth: true,
        locale: '添加实例',
      },
    },
    {
      path: 'approve',
      name: 'ApproveService',
      component: () => import('@/pages/service/approve/ApproveList.vue'),
      meta: {
        requireAuth: true,
        locale: '上线审批',
      },
    },
    {
      path: 'request',
      name: 'RequestVisit',
      component: () => import('@/pages/service/requestVisit/RequestVisit.vue'),
      meta: {
        requireAuth: true,
        locale: '申请访问权限',
      },
    },
  ],
  meta: { requireAuth: true, locale: '服务管理', icon: 'icon-common' },
};

export default service;
