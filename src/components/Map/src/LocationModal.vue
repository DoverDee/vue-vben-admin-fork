<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :width="width"
    :title="title"
    @ok="handleSubmit"
  >
    <div class="mapMode">
      <LocationBMapGL @click="HandlerClickMap" :addr="addr" :lng="lng" :lat="lat" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { LocationBMapGL } from '@/components/Map';

  defineOptions({ name: 'LocationModal' });
  const emit = defineEmits(['success', 'register']);

  // const props = defineProps({
  //   title: { type: String, default: '选择位置' },
  //   width: { type: [String, Number], default: '928px' },
  //   ok: {
  //     type: Function as PropType<() => Promise<any>>,
  //   },
  //   addr: { type: String },
  //   lng: { type: String },
  //   lat: { type: String },
  // });

  const title = ref<string>();
  const width = ref<string>();
  const addr = ref<string>();
  const lng = ref<string>();
  const lat = ref<string>();
  const newGeoLoc = ref<any>();

  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({ confirmLoading: false });
    title.value = data.title || '选择位置';
    width.value = data.width || '928px';
    addr.value = data.addr || '';
    lng.value = data.lng || undefined;
    lat.value = data.lat || undefined;
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      emit('success', newGeoLoc.value);
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  async function HandlerClickMap(location: any) {
    newGeoLoc.value = location;
  }
</script>
<style scoped>
  .address {
    margin-bottom: 10px;
  }

  .mapMode {
    width: 900px;
    height: 600px;
    overflow: hidden;
  }
</style>
