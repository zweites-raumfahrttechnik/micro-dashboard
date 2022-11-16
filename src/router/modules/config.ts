import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const config: RouteRecordRaw = {
  path: '/config',
  name: 'Config',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'issue/config',
      name: 'IssueConfig',
      component: () => import('@/pages/config/issueConfig/IssueConfig.vue'),
      meta: {
        requireAuth: true,
        locale: '发布配置',
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
        locale: '上线审批',
      },
    },
  ],
  meta: { requireAuth: true, locale: '配置管理', icon: 'icon-common' },
};

export default config;
