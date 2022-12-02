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

export interface ChartValue {
  count: number;
  growth: number;
  value: number[];
}

export interface ConcurrentChartValue {
  xAxis: string[];
  concurrent: number[];
  through: number[];
}
export interface GetListDataItem {
  uuid: string;
  username: string;
  ip: string;
  port: number;
  type: number;
}

export interface GetListData {
  count: number;
  data: GetListDataItem[];
}

//bi大屏接口
//服务管理数据展示
export interface ServiceDataList {
  liveService: number;
  approveService: number;
  notApproveService: number;
}
//配置管理数据展示
export interface ConfigDataList {
  liveConfig: number;
  approveConfig: number;
  notApproveConfig: number;
}
//权限管理数据展示
export interface PermissionDataList {
  livePermission: number;
  approvePermission: number;
  notApprovePermission: number;
}
//服务化集成数据展示
export interface ServiceData {
  systemOrientedService: number;
  serviceOrientedService: number;
  configOrientedService: number;
  otherService: number;
}
//实例数据展示
export interface InstanceDataList {
  count: number;
  data: InstanceDataItem[];
}
export interface InstanceDataItem {
  name: string;
  value: number;
}
//服务器集群数据展示
export interface ClusterDataList {
  count: number;
  data: [];
}
