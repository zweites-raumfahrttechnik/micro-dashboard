import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      dts: './auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
    }),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: '@arco-design/web-vue',
          esModule: true,
          resolveStyle: name => {
            return `@arco-design/web-vue/es/${name}/style/index.js`;
          },
        },
      ],
    }),
  ],
});
