<script setup>
import { ref, computed } from 'vue';
import BaseInput from '@components/BaseInput.vue';
import {validateCPF, validateEmail, validatePhoneNumber} from '@utils/string';
import {useSnackbarStore} from "@store/snackbarStore.js";
import BaseButton from "@components/BaseButton.vue";
import {useUsersStore} from "@store/usersStore.js";
import {useRouter} from "vue-router";

const userStore = useUsersStore()

const {registerUser} = userStore

const formData = ref({
  email: {
    value: '',
    validator: (value) => validateEmail(value) ? 'E-mail inválido' : '',
    error: '',
  },
  cpf: {
    value: '',
    validator: (value) =>
        validateCPF(value) ? '' : 'CPF inválido',
    error: '',
  },
  name: {
    value: '',
    validator: (value) =>
        value.trim() ? '' : 'Nome é obrigatório',
    error: '',
  },
  phone: {
    value: '',
    validator: (value) =>
        validatePhoneNumber(value) ? '' : 'Número de telefone inválido',
    error: '',
  },
});

const isSubmitting = ref(false);
const router = useRouter();

const handleError = (field, errorMessage) => {
  formData.value[field].error = errorMessage;
};

const isFormValid = computed(() => {
  return Object.values(formData.value).every((field) => !field.error && field.value);
});

const handleSubmit = () => {
  if (isFormValid.value) {
    isSubmitting.value = true;

    let user = Object.fromEntries(
        Object.entries(formData.value).map(([key, field]) => [key, field.value])
    );

    user.cpf = user.cpf.replace(/\D/g, '');
    user.phone = user.phone.replace(/\D/g, '');

    registerUser(user);

    useSnackbarStore().displaySnackbar({message: 'Usuário registrado com sucesso!', type: 'success'});

    router.push({name: 'user-list'})

  } else {
    useSnackbarStore().displaySnackbar({message: 'Por favor, corrija os erros antes de enviar.', type: 'error'});
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 sm:gap-5">
    <BaseInput
        id="user-name"
        label="Nome"
        v-model="formData.name.value"
        :validate="formData.name.validator"
        placeholder="Digite seu nome"
        @input-error="handleError('name', $event)"
    />

    <BaseInput
        id="user-cpf"
        label="CPF"
        mask="###.###.###-##"
        v-model="formData.cpf.value"
        :validate="formData.cpf.validator"
        placeholder="Digite seu CPF"
        @input-error="handleError('cpf', $event)"
    />

    <BaseInput
        id="user-phone"
        label="Telefone"
        mask="(##) #####-####"
        v-model="formData.phone.value"
        :validate="formData.phone.validator"
        placeholder="Digite seu telefone"
        @input-error="handleError('phone', $event)"
    />

    <BaseInput
        id="user-email"
        label="E-mail"
        type="email"
        v-model="formData.email.value"
        :validate="formData.email.validator"
        placeholder="Digite seu e-mail"
        @input-error="handleError('email', $event)"
    />

    <div class="flex justify-between items-center gap-2">

    <BaseButton
        :disabled="!isFormValid"
        :loading="isSubmitting"
        class="self-start"
        @click="handleSubmit"
    >
      Registrar
    </BaseButton>

      <RouterLink :to="{name: 'user-list'}" class="text-sm sm:text-md link text-center">Voltar à Lista de Usuários</RouterLink>
    </div>

  </form>
</template>

<style scoped lang="scss">
@import '@assets/styles/_theme.scss';
.link {
  color: $primary-color;

  &:hover {
    opacity: 0.7;
  }
}
</style>
