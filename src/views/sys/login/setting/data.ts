import { FormSchema } from '@/components/Form/index';
import { patternValidation } from '@/utils/validate';

export enum ItemEnum {
  PASSWORD = 'password',
  EMAIL = 'email',
  PHONE = 'phone',
  QUESTION = 'question',
  MFA = 'mfa',
  BIND = 'bind',
  NOTICE = 'notice',
}

export interface ListItem {
  key: string;
  title: string;
  description: string;
  type: ItemEnum;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
  {
    key: '3',
    name: '账号绑定',
    component: 'AccountBind',
  },
  {
    key: '4',
    name: '新消息通知',
    component: 'MsgNotify',
  },
];

// 基本设置 form
export const baseSetschemas: FormSchema[] = [
  {
    label: 'ID',
    field: 'id',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '用户名',
    field: 'username',
    component: 'Input',
    colProps: { span: 18 },
    dynamicDisabled: true,
  },
  {
    label: '昵称',
    field: 'nickname',
    component: 'Input',
    colProps: { span: 18 },
  },
  {
    label: '真实名',
    field: 'realName',
    component: 'Input',
    colProps: { span: 18 },
  },
  {
    label: '身份证',
    field: 'idCard',
    component: 'Input',
    colProps: { span: 18 },
  },
  {
    field: 'location',
    label: '所在位置',
    slot: 'location',
    colProps: { span: 18 },
  },
  {
    field: 'longitude',
    component: 'Input',
    label: '经度',
    colProps: { span: 18 },
    show: false,
  },
  {
    field: 'latitude',
    component: 'Input',
    label: '纬度',
    colProps: { span: 18 },
    show: false,
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    colProps: { span: 18 },
  },
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    type: ItemEnum.PASSWORD,
    title: '账户密码',
    description: '当前密码强度: 中',
    extra: '修改',
  },
  {
    key: '4',
    type: ItemEnum.EMAIL,
    title: '邮箱',
    description: '未绑定邮箱',
    extra: '修改',
  },
  {
    key: '2',
    type: ItemEnum.PHONE,
    title: '密保手机',
    description: '未绑定手机',
    extra: '修改',
  },
  {
    key: '3',
    type: ItemEnum.QUESTION,
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    extra: '修改',
  },
  {
    key: '5',
    type: ItemEnum.MFA,
    title: 'MFA设备',
    description: '未绑定设备，绑定后可以进行二次确认',
    extra: '修改',
  },
];

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    type: ItemEnum.BIND,
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    extra: '绑定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    type: ItemEnum.BIND,
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    extra: '绑定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    type: ItemEnum.BIND,
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    extra: '绑定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    type: ItemEnum.NOTICE,
    title: '私信消息',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    type: ItemEnum.NOTICE,
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    type: ItemEnum.NOTICE,
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
];

export const secureSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    required: true,
    show: false,
  },
  {
    field: 'type',
    label: 'Type',
    component: 'Input',
    required: true,
    show: false,
  },
  {
    field: 'smsTo',
    label: '获取验证码方式',
    component: 'Select',
    componentProps: {
      showSearch: true,
      options: [
        { key: 1, value: ItemEnum.EMAIL, label: '邮箱' },
        { key: 2, value: ItemEnum.PHONE, label: '手机号' },
      ],
    },
    dynamicRules: ({ values }) => {
      const rules =
        values.type === ItemEnum.PASSWORD
          ? [
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject('请选择获取验证码方式');
                  }
                  if (value === ItemEnum.EMAIL && !values.email) {
                    return Promise.reject('邮箱尚未设置，不能通过邮箱获取验证码');
                  }
                  if (value === ItemEnum.PHONE && !values.phone) {
                    return Promise.reject('手机号尚未设置，不能通过手机号获取验证码');
                  }
                  return Promise.resolve();
                },
              },
            ]
          : [];
      return rules;
    },
    ifShow: ({ values }) => values.type === ItemEnum.PASSWORD,
  },
  {
    field: 'email',
    label: 'Email',
    component: 'Input',
    show: false,
  },
  {
    field: 'phone',
    label: 'Phone',
    component: 'Input',
    show: false,
  },
  {
    field: 'password',
    label: '密码',
    required: true,
    component: 'InputPassword',
    componentProps: {
      autocomplete: 'new-password',
    },
    dynamicRules: ({ values }) => {
      const rules =
        values.type === ItemEnum.PASSWORD
          ? [
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject('密码不能为空');
                  }
                  return Promise.resolve();
                },
              },
            ]
          : [];
      return rules;
    },
    ifShow: ({ values }) => values.type === ItemEnum.PASSWORD,
  },
  {
    field: 'newPassword',
    label: '新密码',
    component: 'InputPassword',
    componentProps: {
      autocomplete: 'new-password',
    },
    dynamicRules: ({ values }) => {
      const rules =
        values.type === ItemEnum.PASSWORD
          ? [
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject('新密码不能为空');
                  }
                  return Promise.resolve();
                },
              },
              patternValidation('pswd'),
            ]
          : [];
      return rules;
    },
    ifShow: ({ values }) => values.type === ItemEnum.PASSWORD,
  },
  {
    field: 'confirmPassword',
    label: '确认新密码',
    component: 'InputPassword',
    componentProps: {
      autocomplete: 'new-password',
    },
    dynamicRules: ({ values }) => {
      const rules =
        values.type === ItemEnum.PASSWORD
          ? [
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject('新密码不能为空');
                  }
                  if (value !== values.newPassword) {
                    return Promise.reject('两次输入的密码不一致');
                  }
                  return Promise.resolve();
                },
              },
              patternValidation('pswd'),
            ]
          : [];
      return rules;
    },
    ifShow: ({ values }) => values.type === ItemEnum.PASSWORD,
  },
  {
    field: 'newEmail',
    label: '新邮箱',
    component: 'Input',
    helpMessage: ['系统中唯一'],
    dynamicRules: ({ values }) => {
      const rules =
        values.type === ItemEnum.EMAIL
          ? [
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject('新邮箱不能为空');
                  }
                  if (value === values.email) {
                    return Promise.reject('不能与已设置的邮箱相同');
                  }
                  return Promise.resolve();
                },
              },
              patternValidation('email'),
            ]
          : [];
      return rules;
    },
    ifShow: ({ values }) => values.type === ItemEnum.EMAIL,
  },
  {
    field: 'newPhone',
    label: '新手机号',
    component: 'Input',
    helpMessage: ['系统中唯一'],
    dynamicRules: ({ values }) => {
      const rules =
        values.type === ItemEnum.PHONE
          ? [
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject('新手机号不能为空');
                  }
                  if (value === values.phone) {
                    return Promise.reject('不能与已设置的手机号相同');
                  }
                  return Promise.resolve();
                },
              },
              patternValidation('phone'),
            ]
          : [];
      return rules;
    },
    ifShow: ({ values }) => values.type === ItemEnum.PHONE,
  },
  {
    field: 'smsCode',
    label: '验证码',
    slot: 'sms',
    required: true,
  },
];
