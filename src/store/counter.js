import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useCounterStore = defineStore('counter', () => {

    const count = ref(0);

    // const increment = () => count.value ++; // Se puede hacer asi tambien
    const increment = () => {
        count.value ++;
    }

    const decrement = () => {
        count.value --;
    }

    // const double = computed(() => count.value * 2); // Se puede hacer asi tambien
    const double = computed(() => {
       return count.value * 2
    });

    //NOTE: La diferencia principal que he visto es que cuando usas propiedad computadas no se modifica el estado reactivo
    // global en este caso count, pero si usas las otras funciones sí se modifica.

    return {
        count,
        increment,
        double,
        decrement

    }
})