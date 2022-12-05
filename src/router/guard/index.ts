import { Router } from 'vue-router';
import { setupNProgress } from './nprogress';
import { setupAuth } from './auth';

export default function bootstrapRouteGuard(router: Router) {
  setupNProgress(router);
  setupAuth(router);
}
