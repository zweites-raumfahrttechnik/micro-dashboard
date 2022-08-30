import { RouteRecordNormalized } from 'vue-router';

const modules = import.meta.glob('./modules/*.ts', { eager: true });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatModules(_modules: Record<string, any>, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach(key => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) {
      return;
    }

    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule];
    result.push(...moduleList);
  });

  return result;
}

export const appRoutes = formatModules(modules, []);

export const appMenu = appRoutes.map(el => {
  const { name, path, meta, redirect, children } = el;

  return { name, path, meta, redirect, children };
});
