import { viteMockServe } from 'vite-plugin-mock';

function createMockPlugin() {
  return [
    viteMockServe({
      ignore: /^_/,
      mockPath: 'mock',
    }),
  ];
}

export default createMockPlugin;
