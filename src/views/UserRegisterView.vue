<script setup>
  import PageHeader from "@components/PageHeader.vue";
  import FormUserRegister from "@views/components/FormUserRegister.vue";
</script>

<template>
  <div class="max-w-[600px] w-full p-4 sm:p-8 flex flex-col gap-3 sm:gap-6 shadow-lg rounded-lg view-form">
    <PageHeader>
      Registro de usuário
    </PageHeader>

    <FormUserRegister />
  </div>
</template>

<style scoped lang="scss">
@import '@assets/styles/_theme.scss';
.view-form {
  background-color: $white-color;
}
</style>