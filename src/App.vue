<script setup>
import MessageSnackBar from "@components/MessageSnackBar.vue";
import {onMounted} from "vue";
import {useUsersStore} from "@store/usersStore.js";

const usersStore = useUsersStore()

onMounted(() => {
  usersStore.fetchUsers()
})
</script>

<template>
  <MessageSnackBar/>
  <main class="p-4 sm:p-8 flex flex-col gap-6 justify-center items-center">
    <RouterView/>
  </main>
</template>

