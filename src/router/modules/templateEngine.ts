import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const service: RouteRecordRaw = {
  path: '/templateEngine',
  name: 'TemplateEngine',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'mainInterface',
      name: 'MainInterface',
      component: () => import('@/pages/templateEngine/MainInterface.vue'),
      meta: {
        requireAuth: true,
        locale: '模板引擎',
      },
    },
  ],

  meta: { requireAuth: true, locale: '模板', icon: 'icon-bookmark' },
};

export default service;
