import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useCurrentProcessStore = defineStore('currentPro', () => {

    const currentProcess = ref('');

    return {
        currentProcess
    }

})




