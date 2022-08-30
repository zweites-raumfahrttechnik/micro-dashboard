import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[];
    requireAuth: boolean;
    icon?: string;
    hideInMenu?: boolean;
    hideChildrenInMenu?: boolean;
    activeMenu?: string;
    order?: number;
    noAffix?: boolean;
    ignoreCache?: boolean;
    locale?: string;
  }
}
