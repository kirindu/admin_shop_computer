import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useCurrentUserStore = defineStore('currentUser', () => {

    const currentUser = ref({});

    return {
        currentUser
    }

})




