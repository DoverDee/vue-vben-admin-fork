import { withInstall } from '@/utils';
import locationBMapGL from './src/LocationBMapGL.vue';
// import locationModal from './src/LocationModal.vue';

export * from './src/typing';
export { default as LocationModal } from './src/LocationModal.vue';
export const LocationBMapGL = withInstall(locationBMapGL);
// export const LocationModal = withInstall(locationModal);
