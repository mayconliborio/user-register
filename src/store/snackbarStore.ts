import {nextTick, ref} from 'vue';
import {defineStore} from 'pinia';

export const useSnackbarStore = defineStore('snackbar', () => {
    const showSnackbar = ref(false);
    const message = ref('');
    const type = ref('success');
    const timeoutId = ref(null);

    function killSnackBar() {
        if (timeoutId.value) {
            clearTimeout(timeoutId.value);
            showSnackbar.value = false;
        }
    }

    function displaySnackbar({message: newMessage, type: newType}) {
        message.value = newMessage;
        type.value = newType;

        killSnackBar();

        nextTick(() => {
            showSnackbar.value = true;
            timeoutId.value = setTimeout(() => {
                showSnackbar.value = false;
                timeoutId.value = null;
            }, 3800);
        })
    }

    return {
        showSnackbar,
        message,
        type,
        displaySnackbar,
        killSnackBar,
    };
});