import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const service: RouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'uselist',
      name: 'UserList',
      component: () => import('@/pages/userManagement/userList/UserList.vue'),
      meta: {
        requireAuth: true,
        locale: '用户列表',
      },
    },
    {
      path: 'authlist',
      name: 'AuthList',
      component: () => import('@/pages/userManagement/authList/AuthList.vue'),
      meta: {
        requireAuth: true,
        locale: '权限列表',
      },
    },
    {
      path: 'currentUserInfo',
      name: 'CurrentUserInfo',
      component: () => import('@/pages/userManagement/currentUserInfo/CurrentUserInfo.vue'),
      meta: {
        requireAuth: true,
        locale: '当前用户信息',
      },
    },
    {
      path: 'addUser',
      name: 'AddUser',
      component: () => import('@/pages/userManagement/addUser/AddUser.vue'),
      meta: {
        requireAuth: true,
        locale: '添加用户',
      },
    },
  ],
  meta: { requireAuth: true, locale: '用户管理', icon: 'icon-common' },
};

export default service;
