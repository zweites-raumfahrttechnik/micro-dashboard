import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const config: RouteRecordRaw = {
  path: '/config',
  name: 'Config',
  component: MAIN_LAYOUT,
  children: [
    // {
    //   path: 'add/service',
    //   name: 'AddService',
    //   component: () => import('@/pages/service/addService/AddService.vue'),
    //   meta: {
    //     requireAuth: true,
    //     locale: '添加服务',
    //   },
    // },
    {
      path: 'list',
      name: 'ConfigList',
      component: () => import('@/pages/configuration/ConfigList.vue'),
      meta: {
        requireAuth: true,
        locale: '配置列表',
      },
    },
    // {
    //   path: 'add/instance',
    //   name: 'AddInstance',
    //   component: () => import('@/pages/service/addInstance/AddInstance.vue'),
    //   meta: {
    //     requireAuth: true,
    //     locale: '添加实例',
    //   },
    // },
    // {
    //   path: 'approve',
    //   name: 'ApproveService',
    //   component: () => import('@/pages/service/approve/ApproveList.vue'),
    //   meta: {
    //     requireAuth: true,
    //     locale: '上线审批',
    //   },
    // },
  ],
  meta: { requireAuth: true, locale: '配置管理', icon: 'icon-common', order: 2 },
};

export default config;
