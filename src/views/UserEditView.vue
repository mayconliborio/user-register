<script setup>
import PageHeader from "@components/PageHeader.vue";
import FormUser from "@views/components/FormUser.vue";

defineProps({
  indexUser: {
    type: Number,
    required: true,
  },
});
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
@import '@assets/styles/_theme.scss';

.view-form {
  background-color: $white-color;
}
</style>