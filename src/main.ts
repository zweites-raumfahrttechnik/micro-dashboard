import { createApp } from 'vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import App from './App.vue';
import bootstrapPinia from './model';
import bootstrapRouter from './router';

import './style/global.less';

const bootsrap = () => {
  const app = createApp(App);

  app.use(ArcoVueIcon);

  bootstrapRouter(app);

  bootstrapPinia(app);

  app.mount('#app');
};

bootsrap();
