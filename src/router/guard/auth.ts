import { Router } from 'vue-router';
import { useUserModel } from '@/model';

export function setupAuth(router: Router) {
  const { token, role } = useUserModel();

  router.beforeEach((to, from, next) => {
    if (
      (token.value === null || token.value === undefined || token.value === '') &&
      to.fullPath !== '/login'
    ) {
      next({ name: 'Login' });
      return;
    }

    if (to.meta.roles !== null && to.meta.roles !== undefined) {
      if (!to.meta.roles.includes(role.value || '')) {
        next({ name: 'Login' });
        return;
      }
    }

    next();
  });
}
