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
  updateAt:string;
  user: UserInfo;
}

export interface ConfigListData {
  count: number;
  data: ConfigListItem[];
}

