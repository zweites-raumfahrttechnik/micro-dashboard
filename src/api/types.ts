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

export interface ConfigListItem {
  uuid: string;
  dataId: string;
  type: string;
  createAt: string;
  updateAt: string;
  user: UserInfo;
}

export interface ConfigListData {
  count: number;
  data: ConfigListItem[];
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

// 用户管理

export interface UserItem {
  uuid: string;
  username: string;
  nickname: string;
  authid: number[];
}

export interface UserListData {
  count: number;
  userdata: UserItem[];
}

export interface AuthItem {
  id: number;
  uuid: string;
  systemname: string;
  authname: string;
}

export interface AuthListData {
  count: number;
  authdata: AuthItem[];
}

export interface CurrentUserInfo {
  nickname: string;
  auth: authItem[];
}

export interface authItem {
  role: number;
}
