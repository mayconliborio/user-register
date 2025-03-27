<script setup>
import {ref, computed, onMounted} from 'vue';
import BaseInput from '@components/BaseInput.vue';
import {validateCPF, validateEmail, validatePhoneNumber} from '@utils/string';
import {useSnackbarStore} from "@store/snackbarStore.js";
import BaseButton from "@components/BaseButton.vue";
import {useUsersStore} from "@store/usersStore.js";
import {useRouter} from "vue-router";

const userStore = useUsersStore()

const {registerUser, getUserByIndex, editUserByIndex} = userStore

const props = defineProps({
  indexUser: {
    type: [Number, undefined],
    default: undefined
  },
  editing: Boolean,
})

const userToEdit = ref(props.editing ? getUserByIndex(props.indexUser) : null)

const formData = ref({
  email: {
    value: userToEdit.value?.email || '',
    validator: (value) => validateEmail(value) ? '' : 'E-mail inválido',
    error: '',
  },
  cpf: {
    value: userToEdit.value?.cpf || '',
    validator: (value) =>
        validateCPF(value) ? '' : 'CPF inválido',
    error: '',
  },
  name: {
    value: userToEdit.value?.name || '',
    validator: (value) =>
        value.trim()?.length >= 3 ? '' : 'Nome deve conter 3 caracteres ou mais',
    error: '',
  },
  phone: {
    value: userToEdit.value?.phone || '',
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
  if (isSubmitting.value) return

  if (isFormValid.value) {
    isSubmitting.value = true;

    setTimeout(() => {
      let user = Object.fromEntries(
          Object.entries(formData.value).map(([key, field]) => [key, field.value])
      );

      user.cpf = user.cpf.replace(/\D/g, '');
      user.phone = user.phone.replace(/\D/g, '');

      if (props.editing) {
        editUserByIndex(props.indexUser, user)
      } else {
        registerUser(user);
      }

      useSnackbarStore().displaySnackbar({message: 'Usuário alterado com sucesso!', type: 'success'});

      router.push({name: 'user-list'})
    }, 1000)

  } else {
    useSnackbarStore().displaySnackbar({message: 'Por favor, corrija os erros antes de enviar.', type: 'error'});
  }
};

onMounted(() => {
  if (props.editing && !userToEdit.value) {
    useSnackbarStore().displaySnackbar({message: 'Usuário não encontrado.', type: 'error'});
    router.push({name: 'user-list'})
  }
})
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
        mask="['(##) ####-####', '(##) # ####-####']"
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

    <div class="flex flex-col justify-between items-center gap-5 sm:gap-8">

      <BaseButton
          :disabled="!isFormValid"
          :loading="isSubmitting"
          class="self-start w-full"
          @click="handleSubmit"
      >
        {{ editing ? 'Editar Usuário' : 'Cadastrar Usuário' }}
      </BaseButton>

      <RouterLink :to="{name: 'user-list'}" class="text-xs sm:text-md link text-center">Voltar à Lista de Usuários
      </RouterLink>
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
