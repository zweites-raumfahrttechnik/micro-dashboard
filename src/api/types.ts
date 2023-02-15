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

export interface CurrentUserInfo {
  nickname: string;
  auth: auth[];
}

export interface auth {
  role: number;
}

export interface UserListData {
  count: number;
  data: UserItem[];
}

export interface UserItem {
  uuid: string;
  username: string;
  nickname: string;
}

export interface AuthListData {
  count: number;
  data: AuthItem[];
}

export interface AuthItem {
  uuid: string;
  system: string;
  auth: string;
}

export interface UserAuthInfoItem {
  system: string;
  role: number;
}

export interface UserAuthInfoData {
  authList: UserAuthInfoItem[];
}

export interface TemplateListItem {
  templateName: string;
  status: number;
}

export interface TemplateListData {
  data: TemplateListItem[];
}
