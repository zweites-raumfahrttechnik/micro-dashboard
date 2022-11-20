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

export interface VisitListData {
  count: number;
  data: VisitListItem[];
}

export interface VisitListItem {
  createAt: string;
  name: string;
  status: number;
  user: User;
  uuid: string;
  visitor: Visitor;
}

export interface User {
  nickname: string;
  uuid: string;
}

export interface Visitor {
  name: string;
  uuid: string;
}
