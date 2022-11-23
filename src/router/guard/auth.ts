import { Router } from 'vue-router';
import { useUserModel } from '@/model';

export function setupAuth(router: Router) {
  const { token } = useUserModel();

  router.beforeEach((to, from, next) => {
    if (token === null && to.fullPath !== '/login') {
      next({ name: 'Login' });
      return;
    }

    next();
  });
}
