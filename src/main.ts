import { createApp } from 'vue';

import App from './App.vue';
import bootstrapPinia from './model';
import bootstrapRouter from './router';

import './style/global.less';

const bootsrap = () => {
  const app = createApp(App);

  bootstrapRouter(app);

  bootstrapPinia(app);

  app.mount('#app');
};

bootsrap();
