import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const service: RouteRecordRaw = {
  path: '/visit',
  name: 'Visit',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'list',
      name: 'VisitList',
      component: () => import('@/pages/visit/list/ServiceAccesstList.vue'),
      meta: {
        requireAuth: true,
        locale: '服务访问申请列表',
      },
    },
    {
      path: 'add',
      name: 'VisitAdd',
      component: () => import('@/pages/visit/add_and_del/AddServiceAccess.vue'),
      meta: {
        requireAuth: true,
        locale: '服务访问权限申请',
      },
    },
    {
      path: 'del',
      name: 'VisitDel',
      component: () => import('@/pages/visit/add_and_del/DelServiceAccess.vue'),
      meta: {
        requireAuth: true,
        locale: '服务访问权限删除',
      },
    },
  ],
  meta: { requireAuth: true, locale: '服务访问管理', icon: 'icon-common' },
};

export default service;
