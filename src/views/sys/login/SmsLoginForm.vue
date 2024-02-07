<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="emailPhone" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.emailPhone"
          :placeholder="emailPhonePlaceHolder"
          class="fix-auto-fill"
        >
          <template #addonAfter>
            <Select v-model:value="formData.smsRoute" size="large" class="fix-auto-fill">
              <Select.Option :value="LoginStateEnum.EMAIL">{{
                t('sys.login.email')
              }}</Select.Option>
              <Select.Option :value="LoginStateEnum.MOBILE">{{
                t('sys.login.mobile')
              }}</Select.Option>
            </Select>
          </template>
        </Input>
      </FormItem>
      <FormItem name="smsCode" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.smsCode"
          :count="300"
          :sendCodeApi="() => sendCodeHander()"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
          {{ t('sys.login.loginButton') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import { Form, Input, Button, Select } from 'ant-design-vue';
  import { CountdownInput } from '@/components/CountDown';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isValidPhone, isValidEmail } from '@/utils/validate';
  import { getPhoneSms, getEmailSms, SmsType } from '@/api/sys/account';
  import { useAccountStore } from '@/store/modules/account';
  import { useDesign } from '@/hooks/web/useDesign';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const { createMessage, notification, createErrorModal } = useMessage();

  const formRef = ref();
  const loading = ref(false);
  const { validForm } = useFormValid(formRef);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN_SMS);
  const accountStore = useAccountStore();
  const { prefixCls } = useDesign('login');

  const formData = reactive({
    smsRoute: LoginStateEnum.EMAIL,
    emailPhone: '',
    smsCode: '',
  });

  const emailPhonePlaceHolder = computed(() => {
    return formData.smsRoute === LoginStateEnum.EMAIL
      ? t('sys.login.email')
      : t('sys.login.mobile');
  });

  async function sendCodeHander() {
    if (formData.smsRoute === LoginStateEnum.EMAIL) {
      if (isValidEmail(formData.emailPhone)) {
        const rste = await getEmailSms(formData.emailPhone, SmsType.LOGIN);
        if (rste) {
          createMessage.info(t('sys.login.smsSendSuccess'));
          return true;
        } else {
          createMessage.error(t('sys.login.smsSendError'));
        }
      } else {
        createMessage.error(t('sys.login.emailError'));
      }
    }
    if (formData.smsRoute === LoginStateEnum.MOBILE) {
      if (isValidPhone(formData.emailPhone)) {
        const rstp = await getPhoneSms(formData.emailPhone, SmsType.LOGIN);
        if (rstp) {
          createMessage.info(t('sys.login.smsSendSuccess'));
          return true;
        } else {
          createMessage.error(t('sys.login.smsSendError'));
        }
      } else {
        createMessage.error(t('sys.login.mobileError'));
      }
    }
    return false;
  }

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const accountInfo = await accountStore.login({
        smsCode: data.smsCode,
        user: data.emailPhone,
        mode: 'none', //不要默认的错误提示
      });
      if (accountInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${accountInfo.username}`,
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>
