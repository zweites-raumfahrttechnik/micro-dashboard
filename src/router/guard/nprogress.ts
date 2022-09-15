import nProgress from 'nprogress';
import { Router } from 'vue-router';

export function setupNProgress(router: Router) {
  router.beforeEach(() => {
    nProgress.start();
  });

  router.afterEach(() => {
    nProgress.done();
  });
}
