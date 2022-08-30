import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const dashboard: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'welcome',
      name: 'Welcome',
      component: () => import('@/pages/WelcomePage.vue'),
      meta: {
        requireAuth: true,
        locale: '欢迎',
      },
    },
  ],
  meta: { requireAuth: true, locale: '控制台' },
};

export default dashboard;
