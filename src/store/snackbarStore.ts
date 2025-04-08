import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';

interface SnackbarOptions {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

export const useSnackbarStore = defineStore('snackbar', () => {
    const showSnackbar = ref<boolean>(false);
    const message = ref<string>('');
    const type = ref<'success' | 'error' | 'warning' | 'info'>('success');
    const timeoutId = ref<number | NodeJS.Timeout | null>(null);

    function killSnackBar() {
        if (timeoutId.value) {
            clearTimeout(timeoutId.value);
            showSnackbar.value = false;
            timeoutId.value = null;
        }
    }

    function displaySnackbar(options: SnackbarOptions) {
        message.value = options.message;
        type.value = options.type || 'success';

        killSnackBar();

        nextTick(() => {
            showSnackbar.value = true;
            timeoutId.value = setTimeout(() => {
                showSnackbar.value = false;
                timeoutId.value = null;
            }, 3800);
        });
    }

    return {
        showSnackbar,
        message,
        type,
        displaySnackbar,
        killSnackBar,
    };
});