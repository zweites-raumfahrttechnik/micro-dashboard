import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const screen: RouteRecordRaw = {
  path: '/screen',
  name: 'Screen',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'dataDisplay',
      name: 'DataDisplay',
      component: () => import('@/pages/dataDisplay/datav/index.vue'),
      meta: {
        requireAuth: true,
        locale: '数据展示',
      },
    },
  ],
  meta: { requireAuth: true, locale: '可视化', icon: 'icon-dashboard' },
};

export default screen;
