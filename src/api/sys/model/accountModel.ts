/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  user: string | number;
  password?: string;
  smsCode?: string;
}

export interface RoleInfo {
  id: string | number;
  name: string;
  code: string;
}
