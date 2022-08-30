import { App } from 'vue';
import { createPinia } from 'pinia';

import { useAppModel } from './modules/app';

const pinia = createPinia();

function bootstrapPinia(app: App) {
  app.use(pinia);
}

export { useAppModel };

export default bootstrapPinia;
