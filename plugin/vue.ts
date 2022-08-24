import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

function createVuePlugin() {
  return [vue(), vueJsx()];
}

export default createVuePlugin;
