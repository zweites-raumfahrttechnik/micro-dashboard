export interface AddUserInfo {
  auth?: Auth[];
  password?: string;
  username?: string;
}

export interface Auth {
  auth_id?: string;
}
