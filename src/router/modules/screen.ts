import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const screen: RouteRecordRaw = {
  path: '/screen',
  name: 'Screen',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'dataV',
      name: 'DataV',
      component: () => import('@/pages/screen/datav/index.vue'),
      meta: {
        requireAuth: true,
        locale: '展示视图',
      },
    },
  ],
  meta: { requireAuth: true, locale: '可视化', icon: 'icon-dashboard' },
};

export default screen;
