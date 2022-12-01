import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const service: RouteRecordRaw = {
  path: '/template',
  name: 'Template',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'engine',
      name: 'TemplateEngine',
      component: () => import('@/pages/templateEngine/TemplatePage.vue'),
      meta: {
        requireAuth: true,
        locale: '模板生成',
      },
    },
  ],
  meta: { requireAuth: true, locale: '模板引擎', icon: 'icon-bookmark', order: 4 },
};

export default service;
