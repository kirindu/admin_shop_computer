import { defineStore } from 'pinia';

import { computed } from "vue";
import { useOnline } from '@vueuse/core';


export const useConnectionStore = defineStore("connection", () => {

    const online = useOnline();

    const state = computed(() => online ? 'Online' : 'Offline')

    return { state, online };
});
