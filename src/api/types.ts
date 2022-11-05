// 获取服务列表
export interface UserInfo {
  nickname: string;
  uuid: string;
}

export interface ThemeListItem {
  uuid: string;
  ip: string;
  port: number;
  name: string;
  status: 1 | 2;
  createAt: string;
  user: UserInfo;
}

export interface ThemeListData {
  count: number;
  data: ThemeListData[];
}
