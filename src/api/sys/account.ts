import { defHttp } from '@/utils/http/axios';
import type { AccountInfo } from '#/store';
import { LoginParams } from './model/accountModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  // 前端代理服务接口
  // LoginByPwUrl = '/login',
  // LogoutUrl = '/logout',
  // AccountInfoUrl = '/getUserInfo',

  // 后端服务接口
  RegisterUrl = '/sys/auth/register',
  LoginBySmsUrl = '/sys/auth/login/sms',
  LoginByPwUrl = '/sys/auth/login/pswd',
  LogoutUrl = '/sys/auth/logout',
  AccountInfoUrl = '/sys/user/singleWithRela',
  AccountPermUrl = '/sys/user/listGlobalResourceCode',
  IsUniqueUrl = '/sys/auth/unique',
  ResetPwSmsUrl = '/sys/auth/reset/pswd',
  UpdateAccountSmsUrl = '/sys/auth/update/account',
  UpdatePwSmsUrl = '/sys/auth/update/pswd',
  UpdateEmailSmsUrl = '/sys/auth/update/email',
  UpdatePhoneSmsUrl = '/sys/auth/update/phone',
  SmsEmailUrl = '/sys/auth/sms/email',
  SmsPhoneUrl = '/sys/auth/sms/phone',
  //
  TestRetry = '/testRetry',
}

// 短信类型
export enum SmsType {
  REGISTER = 'register',
  LOGIN = 'login',
  RESET_PSWD = 'reset_password',
  UPDATE_PSWD = 'update_password',
  UPDATE_EMAIL = 'update_email',
  UPDATE_PHONE = 'update_phone',
}

/**
 * @description: login
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const url = params.password ? Api.LoginByPwUrl : Api.LoginBySmsUrl;
  return defHttp.post<any>(
    {
      url: url,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: logout
 */
export function doLogout() {
  return defHttp.get({ url: Api.LogoutUrl });
}

/**
 * @description: feach sms by email
 */
export function getEmailSms(email: string, smsType: SmsType) {
  return defHttp.get<boolean>({ url: Api.SmsEmailUrl, params: { email, smsType } });
}

/**
 * @description: feach sms by phone
 */
export function getPhoneSms(phone: string, smsType: SmsType) {
  return defHttp.get<boolean>({ url: Api.SmsPhoneUrl, params: { phone, smsType } });
}

/**
 * @description: feach info
 */
export function getAccountInfo() {
  return defHttp.get<AccountInfo>({ url: Api.AccountInfoUrl }, { errorMessageMode: 'modal' });
}

/**
 * @description: feach permission
 */
export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.AccountPermUrl });
}

/**
 * @description: valide unique
 */
export function valideUnique(user: string) {
  return defHttp.get<boolean>({ url: Api.IsUniqueUrl, params: { user } });
}

/**
 * @description: register account
 */
export function registerAccount(account: AccountInfo) {
  return defHttp.post<boolean>({
    url: Api.RegisterUrl,
    params: { ...account },
  });
}

/**
 * @description: reset password
 */
export function resetPswd(account: AccountInfo) {
  return defHttp.put<string>({
    url: Api.ResetPwSmsUrl,
    params: { ...account },
  });
}

/**
 * @description: update password
 */
export function updatePswd(account: AccountInfo) {
  return defHttp.put<boolean>({
    url: Api.UpdatePwSmsUrl,
    params: { ...account },
  });
}

/**
 * @description: update phone
 */
export function updatePhone(account: AccountInfo) {
  return defHttp.put<boolean>({
    url: Api.UpdatePhoneSmsUrl,
    params: { ...account },
  });
}

/**
 * @description: update email
 */
export function updateEmail(account: AccountInfo) {
  return defHttp.put<boolean>({
    url: Api.UpdateEmailSmsUrl,
    params: { ...account },
  });
}

/**
 * @description: update info
 */
export function updateInfo(account: AccountInfo) {
  return defHttp.put<boolean>({
    url: Api.UpdateAccountSmsUrl,
    params: { ...account },
  });
}

// request retry demo
export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
