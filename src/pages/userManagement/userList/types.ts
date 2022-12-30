export interface SearchParams {
  pg: number;
  size: number;
  username?: string;
}

export interface UserUpdateInfo {
  auth?: Auth[];
  nickname?: string;
  password?: string;
  uuid?: string;
}

export interface Auth {
  id?: string;
}
