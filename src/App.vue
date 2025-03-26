<script setup>
import MessageSnackBar from "@components/MessageSnackBar.vue";
import BaseLoading from "@components/BaseLoading.vue";
</script>

<template>
  <BaseLoading/>
  <MessageSnackBar />
  <RouterView />
</template>

