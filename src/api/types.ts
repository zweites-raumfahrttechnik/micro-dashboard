// 获取服务列表
export interface UserInfo {
  nickName: string;
  uuid: string;
}

export interface InstanceItem {
  uuid: string;
  ip: string;
  port: number;
  createAt: string;
}

export interface ThemeListItem {
  uuid: string;
  name: string;
  instance: InstanceItem[];
  createAt: string;
  user: UserInfo;
}

export interface ThemeListData {
  count: number;
  data: ThemeListItem[];
}

export interface AllThemeListDataItem {
  uuid: string;
  name: string;
}

export interface AllThemeListData {
  count: number;
  data: AllThemeListDataItem[];
}

export interface ServiceDetailInstanceItem {
  uuid: string;
  ip: string;
  port: number;
  createAt: string;
  health: boolean;
}

export interface ServiceDetailInstance {
  count: number;
  data: ServiceDetailInstanceItem[];
}

export interface ServiceDetailVisitedItem {
  uuid: string;
  name: string;
  user: UserInfo;
}

export interface ServiceDetailVisited {
  count: number;
  data: ServiceDetailVisitedItem[];
}

export interface ServiceDetail {
  instance: ServiceDetailInstance;
  visited: ServiceDetailVisited;
}
