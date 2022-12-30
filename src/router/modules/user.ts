import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const user: RouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'userList',
      name: 'UserList',
      component: () => import('@/pages/userManagement/userList/UserList.vue'),
      meta: {
        requireAuth: true,
        locale: '用户列表',
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

export default user;
