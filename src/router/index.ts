import NProgress from 'nprogress';
import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import bootstrapRouteGuard from './guard';
import { appRoutes } from './route';

import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...appRoutes],
  scrollBehavior() {
    return { top: 0 };
  },
});

bootstrapRouteGuard(router);

function bootstrapRouter(app: App) {
  app.use(router);
}

export default bootstrapRouter;
