import { App } from 'vue';
import { createPinia } from 'pinia';

import { useAppModel } from './modules/app';
import { useTabModel } from './modules/tab';
import { StoragePlugin } from './plugin';

const pinia = createPinia();
pinia.use(StoragePlugin);

function bootstrapPinia(app: App) {
  app.use(pinia);
}

export { useAppModel, useTabModel };

export default bootstrapPinia;
