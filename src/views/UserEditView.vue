<script setup lang="ts">
import FormUser from "@views/components/FormUser.vue";
import PageHeader from "@components/PageHeader.vue";

interface Props {
  indexUser: number;
}

defineProps<Props>();
</script>

<template>
  <div class="max-w-[600px] w-full p-4 sm:p-8 flex flex-col gap-3 sm:gap-6 shadow-lg rounded-lg view-form">
    <PageHeader>
      Edição de usuário
    </PageHeader>

    <FormUser editing :indexUser="indexUser"/>
  </div>
</template>

<style scoped lang="scss">
@use '@assets/styles/_theme.scss' as *;

.view-form {
  background-color: $white-color;
}
</style>