import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar', () => {
    const show = ref(false);
    const message = ref('');
    const type = ref('success');
    const timeoutId = ref(null);

    function showSnackbar({ message: newMessage, type: newType }) {
        message.value = newMessage;
        type.value = newType;
        show.value = true;

        if (timeoutId.value !== null) {
            clearTimeout(timeoutId.value);
        }

        timeoutId.value = setTimeout(() => {
            show.value = false;
            timeoutId.value = null;
        }, 5000);
    }

    return {
        show,
        message,
        type,
        showSnackbar,
    };
});