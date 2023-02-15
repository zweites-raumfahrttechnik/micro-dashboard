export interface AddUserInfo {
  auth?: Auth[];
  password?: string;
  username?: string;
  nickname?: string;
}

export interface Auth {
  auth_id?: string;
}
