<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="username" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.username"
          :placeholder="t('sys.login.userName')"
          autoComplete="new-user"
        />
      </FormItem>
      <FormItem name="phone" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.phone"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
          autoComplete="new-phone"
        />
      </FormItem>
      <FormItem name="smsCode" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.smsCode"
          :count="300"
          :sendCodeApi="() => sendCodeHander()"
          :placeholder="t('sys.login.smsCode')"
          autoComplete="new-smsCode"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
          autoComplete="new-password"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
          autoComplete="new-password"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
        <strong><a>《用户协议》</a><a>《隐私政策》</a></strong>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed, watchEffect } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox } from 'ant-design-vue';
  import { StrengthMeter } from '@/components/StrengthMeter';
  import { CountdownInput } from '@/components/CountDown';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isValidPhone } from '@/utils/validate';
  import { getPhoneSms, valideUnique, registerAccount, SmsType } from '@/api/sys/account';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { createMessage } = useMessage();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    username: '',
    phone: '',
    smsCode: '',
    password: '',
    confirmPassword: '',
    policy: false,
  });

  watchEffect(() => {
    if (unref(getLoginState) === LoginStateEnum.REGISTER) {
      formData.username = '';
      formData.phone = '';
      formData.smsCode = '';
      formData.password = '';
      formData.confirmPassword = '';
      formData.policy = false;
    }
  });

  async function sendCodeHander() {
    if (isValidPhone(formData.phone)) {
      const rst = await getPhoneSms(formData.phone, SmsType.REGISTER);
      if (rst) {
        createMessage.info(t('sys.login.smsSendSuccess'));
        return true;
      } else {
        createMessage.error(t('sys.login.smsSendError'));
      }
    } else {
      createMessage.error(t('sys.login.mobileError'));
    }
    return false;
  }

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    const nvb = await valideUnique(data.username);
    if (!nvb) {
      createMessage.error('账号已存在');
      return;
    }
    const pvb = await valideUnique(data.phone);
    if (!pvb) {
      createMessage.error('手机号已存在');
      return;
    }
    await registerAccount(data);
    createMessage.success(`注册成功`);
    // 返回登录模块
    handleBackLogin();
  }
</script>
