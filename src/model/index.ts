import { App } from 'vue';
import { createPinia } from 'pinia';

import { useAppModel } from './modules/app';
import { useTabModel } from './modules/tab';

const pinia = createPinia();

function bootstrapPinia(app: App) {
  app.use(pinia);
}

export { useAppModel, useTabModel };

export default bootstrapPinia;
