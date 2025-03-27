<script setup>
import {useSnackbarStore} from '@store/snackbarStore.js';
import {storeToRefs} from "pinia";

const snackbarStore = useSnackbarStore();
const {killSnackBar} = snackbarStore;
const {showSnackbar, message, type} = storeToRefs(snackbarStore)
</script>

<template>
  <div
      v-if="showSnackbar"
      class="snackbar absolute -top[200px] right-10 w-auto max-w-[500px] p-2.5 rounded-md text-white"
      :class="type"
      @click="killSnackBar"
  >
    {{ message }}
  </div>
</template>

<style scoped>
.snackbar {
  animation: topDown 4s;
  z-index: 9999;
}

@keyframes topDown {
  0% {
    top: -200px;
  }
  10% {
    top: 64px;
  }
  15% {
    top: 56px;
  }
  20% {
    top: 60px;
  }
  80% {
    top: 60px;
  }
  90% {
    top: 64px;
  }
  100% {
    top: -200px;
  }
}

.success {
  background-color: #28a745;
}

.error {
  background-color: #dc3545;
}

.warning {
  background-color: #ffc107;
}
</style>
