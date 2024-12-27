import Swal from 'sweetalert2';
import {ref} from 'vue';

export default function useSweetAlert2Notification() {
  const alertResult = ref(null);

  const showSweetAlert = async (options) => {
    try {
      alertResult.value = await Swal.fire(options);
    } catch (error) {
      console.error('SweetAlert2 error:', error);
    }
  };

  return {
    showSweetAlert,
    alertResult
  };
}