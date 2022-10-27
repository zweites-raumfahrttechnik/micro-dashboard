import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const service: RouteRecordRaw = {
  path: '/service',
  name: 'Service',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'list',
      name: 'ServiceList',
      component: () => import('@/pages/service/ServiceList.vue'),
      meta: {
        requireAuth: true,
        locale: '服务列表',
      },
    },
  ],
  meta: { requireAuth: true, locale: '服务管理', icon: 'icon-common' },
};

export default service;
