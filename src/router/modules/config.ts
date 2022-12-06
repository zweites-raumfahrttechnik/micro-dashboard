import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const config: RouteRecordRaw = {
  path: '/config',
  name: 'Config',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'add/config',
      name: 'AddConfig',
      component: () => import('@/pages/config/issueConfig/IssueConfig.vue'),
      meta: {
        requireAuth: true,
        locale: '发布配置',
        roles: ['user'],
      },
    },
    {
      path: 'list',
      name: 'ConfigList',
      component: () => import('@/pages/config/list/ConfigList.vue'),
      meta: {
        requireAuth: true,
        locale: '配置列表',
      },
    },
    {
      path: 'approve',
      name: 'ApproveConfig',
      component: () => import('@/pages/config/approve/ApproveList.vue'),
      meta: {
        requireAuth: true,
        locale: '配置审批',
        roles: ['admin'],
      },
    },
  ],
  meta: { requireAuth: true, locale: '配置管理', icon: 'icon-common', order: 3 },
};

export default config;
