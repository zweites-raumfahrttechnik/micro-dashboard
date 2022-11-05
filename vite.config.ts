import path from 'path';
import { defineConfig } from 'vite';
import createVuePlugin from './plugin/vue';
import createAutoImportPlugin from './plugin/auotImport';
import createArcoPlugin from './plugin/arco';
import createMockPlugin from './plugin/mock';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    ...createVuePlugin(),
    ...createAutoImportPlugin(),
    ...createArcoPlugin(),
    ...createMockPlugin(),
  ],
});
