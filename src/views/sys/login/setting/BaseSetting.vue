<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <Row :gutter="24">
      <Col :span="14">
        <BasicForm @register="register">
          <template #location="{ model, field }">
            <a-input-search v-model:value="model[field]" @search="handleModelEdit(model)">
              <template #enterButton> 地图中点选 </template>
            </a-input-search>
          </template>
        </BasicForm>
      </Col>
      <Col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :uploadApi="uploadApi"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </Col>
    </Row>
    <a-button type="primary" @click="handleSubmit"> 更新基本信息 </a-button>
  </CollapseContainer>
  <LocationModal @register="registerModal" @success="handleSuccess" />
</template>
<script lang="ts" setup>
  import { Row, Col } from 'ant-design-vue';
  import { computed, onMounted } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';
  import { CropperAvatar } from '@/components/Cropper';
  import { useMessage } from '@/hooks/web/useMessage';
  import headerImg from '@/assets/images/header.jpg';

  import { LocationModal } from '@/components/Map/index';
  import { useModal } from '@/components/Modal';
  import { baseSetschemas } from './data';
  import { useAccountStore } from '@/store/modules/account';
  import { uploadApi } from '@/api/sys/upload';
  import { updateInfo } from '@/api/sys/account';
  import { getImageUrl } from '@/utils/http/axios/helper';

  const { createMessage } = useMessage();
  const userStore = useAccountStore();

  const [register, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: baseSetschemas,
    showActionButtonGroup: false,
  });

  const [registerModal, { openModal }] = useModal();

  function handleModelEdit(model: any) {
    openModal(true, {
      title: '选择常驻位置',
      addr: model.location,
      lng: model.longitude,
      lat: model.latitude,
    });
  }

  function handleSuccess(geoLocation: any) {
    setFieldsValue({
      location: geoLocation.address,
      longitude: geoLocation.point.lng,
      latitude: geoLocation.point.lat,
    });
  }

  onMounted(async () => {
    resetFields();
    const accountInfo = await userStore.getAccountInfo;
    setFieldsValue(accountInfo);
  });

  const avatar = computed(() => {
    const { avatar } = userStore.getAccountInfo;
    return getImageUrl(avatar) || headerImg;
  });

  const updateAvatar = async ({ data }) => {
    const accountInfo = await userStore.getAccountInfo;
    accountInfo.avatar = data;
    // 只更新本地, 保存基本信息时才真正保存更改
    userStore.setAccountInfo(accountInfo);
  };

  const handleSubmit = async () => {
    const values = await validate();
    // 本地缓存
    const accountInfo = userStore.getAccountInfo;
    // 身份证有效性验证
    // if (!isValidIdCard(values.idCard)) {
    //   createMessage.error('不是有效的身份证号码！');
    //   return;
    // }
    userStore.setAccountInfo({ ...accountInfo, ...values });
    // 持久化数据库
    await updateInfo({ ...values, avatar: accountInfo.avatar });
    createMessage.success('更新成功！');
  };
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
