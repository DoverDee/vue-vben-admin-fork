<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #sms="{ model, field }">
        <CountdownInput
          v-model:value="model[field]"
          :count="300"
          :sendCodeApi="() => sendSmsHander(model)"
        /> </template
    ></BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { ItemEnum, secureSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import {
    SmsType,
    getEmailSms,
    getPhoneSms,
    valideUnique,
    updatePswd,
    updateEmail,
    updatePhone,
  } from '@/api/sys/account';
  import { useMessage } from '@/hooks/web/useMessage';
  import { CountdownInput } from '@/components/CountDown';

  import { useAppStore } from '@/store/modules/app';
  import { usePermissionStore } from '@/store/modules/permission';
  import { useAccountStore } from '@/store/modules/account';

  const emit = defineEmits(['success', 'register']);

  const type = ref<ItemEnum>();
  const { createMessage } = useMessage();
  const permissionStore = usePermissionStore();
  const accountStore = useAccountStore();
  const appStore = useAppStore();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    name: 'modelForm',
    labelWidth: 120,
    schemas: secureSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });

    type.value = data.type;
    setFieldsValue({
      ...data,
    });
  });

  const getTitle = computed(() => {
    if (type.value === ItemEnum.PASSWORD) {
      return '修改密码';
    }
    if (type.value === ItemEnum.EMAIL) {
      return '修改邮箱';
    }
    if (type.value === ItemEnum.PHONE) {
      return '修改手机号';
    }
    return '';
  });

  async function sendSmsHander(model: any) {
    // console.log('dd@', model);
    let flag = true;
    let errorMsg = '';
    if (type.value === ItemEnum.PASSWORD) {
      switch (model.smsTo) {
        case ItemEnum.EMAIL:
          await getEmailSms(model.email, SmsType.UPDATE_PSWD);
          break;
        case ItemEnum.PHONE:
          await getPhoneSms(model.phone, SmsType.UPDATE_PSWD);
          break;
        default:
          flag = false;
          errorMsg = '请选择获取验证码方式';
      }
    } else {
      switch (type.value) {
        case ItemEnum.EMAIL:
          await getEmailSms(model.newEmail, SmsType.UPDATE_EMAIL);
          break;
        case ItemEnum.PHONE:
          await getPhoneSms(model.newPhone, SmsType.UPDATE_PHONE);
          break;
        default:
          flag = false;
          errorMsg = '验证码发送异常';
      }
    }
    if (flag) {
      createMessage.success(`验证码已发送`);
    } else {
      createMessage.error(errorMsg);
    }
    return flag;
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      if (type.value === ItemEnum.PASSWORD) {
        // 后端优先按邮箱获取验证码（故需根据情况清除多余参数）
        if (values.smsTo === ItemEnum.EMAIL) {
          delete values.phone;
        }
        if (values.smsTo === ItemEnum.PHONE) {
          delete values.email;
        }
        // 修改密码
        const vb = await updatePswd(values);
        if (vb) {
          // 清除缓存, 重新登录
          localStorage.clear();
          appStore.resetAllState();
          permissionStore.resetState();
          accountStore.resetState();
          location.reload();
        }
      }
      let successData = {};
      if (type.value === ItemEnum.EMAIL) {
        const vb = await valideUnique(values.newEmail);
        if (!vb) {
          createMessage.error('邮箱已存在');
          return;
        }
        // 修改邮箱
        await updateEmail(values);
        successData = { email: values.newEmail };
      }
      if (type.value === ItemEnum.PHONE) {
        const vb = await valideUnique(values.newPhone);
        if (!vb) {
          createMessage.error('手机号已存在');
          return;
        }
        // 修改手机号
        await updatePhone(values);
        successData = { phone: values.newPhone };
      }
      createMessage.success(`修改成功`);
      closeDrawer();
      emit('success', successData);
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
./data
