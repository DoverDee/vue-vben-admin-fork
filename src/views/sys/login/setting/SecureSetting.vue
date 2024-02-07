<template>
  <CollapseContainer title="安全设置" :canExpan="false">
    <List>
      <ListItem>
        <ListItemMeta>
          <template #title>
            密码 <div :class="modifyClass" @click="uplateHander(ItemEnum.PASSWORD)">修改</div>
          </template>
          <template #description>
            <div>当前密码强度: 强</div>
          </template>
        </ListItemMeta>
      </ListItem>
      <ListItem>
        <ListItemMeta>
          <template #title>
            邮箱 <div :class="modifyClass" @click="uplateHander(ItemEnum.EMAIL)">修改</div>
          </template>
          <template #description>
            <div>{{ accountInfo.email ? '已绑定邮箱：' + accountInfo.email : '未绑定邮箱' }}</div>
          </template>
        </ListItemMeta>
      </ListItem>
      <ListItem>
        <ListItemMeta>
          <template #title>
            手机 <div :class="modifyClass" @click="uplateHander(ItemEnum.PHONE)">修改</div>
          </template>
          <template #description>
            <div>{{ accountInfo.phone ? '已绑定手机：' + accountInfo.phone : '未绑定手机' }}</div>
          </template>
        </ListItemMeta>
      </ListItem>
      <ListItem>
        <ListItemMeta>
          <template #title>
            密保问题 <div :class="modifyClass" @click="uplateHander(ItemEnum.QUESTION)">修改</div>
          </template>
          <template #description>
            <div>未设置密保问题，密保问题可有效保护账户安全</div>
          </template>
        </ListItemMeta>
      </ListItem>
      <ListItem>
        <ListItemMeta>
          <template #title>
            MFA设备 <div :class="modifyClass" @click="uplateHander(ItemEnum.MFA)">修改</div>
          </template>
          <template #description>
            <div>未绑定设备，绑定后可以进行二次确认</div>
          </template>
        </ListItemMeta>
      </ListItem>
    </List>
  </CollapseContainer>
  <SecureDrawer @register="registerDrawer" @success="handleSuccess" />
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { List } from 'ant-design-vue';
  import { CollapseContainer } from '@/components/Container';
  import { ItemEnum } from './data';
  import { useDrawer } from '@/components/Drawer';
  import { useAccountStore } from '@/store/modules/account';
  import type { AccountInfo } from '#/store';
  import SecureDrawer from './SecureDrawer.vue';

  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;

  const modifyClass = ref<string>(
    'float-right mt-10px mr-30px text-blue-500 text-font-normal cursor-pointer',
  );

  const accountStore = useAccountStore();
  const accountInfo = ref<AccountInfo>({});

  onMounted(async () => {
    accountInfo.value = await accountStore.getAccountInfo;
  });

  const [registerDrawer, { openDrawer }] = useDrawer();

  const uplateHander = (type: ItemEnum) => {
    openDrawer(true, {
      type,
      id: accountInfo.value.id,
      phone: accountInfo.value.phone,
      email: accountInfo.value.email,
    });
  };

  async function handleSuccess(data: any) {
    // console.log('success@', data);
    if (data.email) {
      accountInfo.value.email = data.email;
    }
    if (data.phone) {
      accountInfo.value.phone = data.phone;
    }
    accountStore.setAccountInfo(accountInfo.value);
  }
</script>
