import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const dashboard: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'overview',
      name: 'Overview',
      component: () => import('@/pages/OverviewPage.vue'),
      meta: {
        requireAuth: true,
        locale: '系统概览',
      },
    },
  ],
  meta: { requireAuth: true, locale: '控制台', icon: 'icon-dashboard' },
};

export default dashboard;
