import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

export const REDIRECT_NAME = 'Redirect';

const base: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
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
        name: REDIRECT_NAME,
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
