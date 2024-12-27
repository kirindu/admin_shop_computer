import { useToast } from "vue-toast-notification";

export default function useToastNotification() {
    const showToast = (options) => {
        const toast = useToast();
        toast.open(options);
    };
    return {
        showToast,
    };
}