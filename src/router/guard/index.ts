import { Router } from 'vue-router';
import { setupNProgress } from './nprogress';

export default function bootstrapRouteGuard(router: Router) {
  setupNProgress(router);
}
