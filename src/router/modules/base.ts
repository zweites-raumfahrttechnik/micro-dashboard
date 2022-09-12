import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const base: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'Login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/LoginPage.vue'),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/redirect',
    name: 'RedirectWrapper',
    component: MAIN_LAYOUT,
    meta: {
      requireAuth: true,
      hideInMenu: true,
    },
    children: [
      {
        path: '/redirect/:path',
        name: 'Redirect',
        component: () => import('@/pages/RedirectPage.vue'),
        meta: {
          requireAuth: true,
          hideInMenu: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
];

export default base;
