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
    {
      path: 'welcome1',
      name: 'WelcomeOne',
      component: () => import('@/pages/WelcomeOne.vue'),
      meta: {
        requireAuth: true,
        locale: '欢迎1',
      },
    },
    {
      path: 'welcome2',
      name: 'WelcomeTwo',
      component: () => import('@/pages/WelcomeTwo.vue'),
      meta: {
        requireAuth: true,
        locale: '欢迎2',
      },
    },
  ],
  meta: { requireAuth: true, locale: '控制台', icon: 'icon-dashboard' },
};

export default dashboard;
