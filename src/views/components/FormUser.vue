<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import BaseInput from '@components/BaseInput.vue';
import { validateCPF, validateEmail, validatePhoneNumber } from '@utils/string';
import { useSnackbarStore } from "@store/snackbarStore";
import BaseButton from "@components/BaseButton.vue";
import { useUsersStore } from "@store/usersStore";
import type {User} from "@/@types/User";
import { useRouter, RouterLink } from "vue-router";

interface FormData {
  email: {
    value: string;
    validator: (value: string) => string;
    error: string;
  };
  cpf: {
    value: string;
    validator: (value: string) => string;
    error: string;
  };
  name: {
    value: string;
    validator: (value: string) => string;
    error: string;
  };
  phone: {
    value: string;
    validator: (value: string) => string;
    error: string;
  };
}

interface Props {
  indexUser?: number;
  editing?: boolean;
}

const userStore = useUsersStore();
const { createUser, getUserByIndex, editUserByIndex } = userStore;

const props = defineProps<Props>();

const userToEdit = ref<User | null>(props.editing && props.indexUser !== undefined ? getUserByIndex(props.indexUser) : null);

const formData = ref<FormData>({
  email: {
    value: userToEdit.value?.email || '',
    validator: (value: string) => validateEmail(value) ? '' : 'E-mail inválido',
    error: '',
  },
  cpf: {
    value: userToEdit.value?.cpf || '',
    validator: (value) => validateCPF(value) ? '' : 'CPF inválido',
    error: '',
  },
  name: {
    value: userToEdit.value?.name || '',
    validator: (value) => value.trim()?.length >= 3 ? '' : 'Nome deve conter 3 caracteres ou mais',
    error: '',
  },
  phone: {
    value: userToEdit.value?.phone || '',
    validator: (value) => validatePhoneNumber(value) ? '' : 'Número de telefone inválido',
    error: '',
  },
});

const isSubmitting = ref(false);
const router = useRouter();

const handleError = (field: keyof FormData, errorMessage: string) => {
  formData.value[field].error = errorMessage;
};

const isFormValid = computed(() => {
  return Object.values(formData.value).every((field) => !field.error && field.value);
});

const handleSubmit = () => {
  if (isSubmitting.value) return;

  if (isFormValid.value) {
    isSubmitting.value = true;

    setTimeout(() => {
      const formDataValues = formData.value;

      const user: User = {
        email: formDataValues.email.value,
        cpf: formDataValues.cpf.value.replace(/\D/g, ''),
        name: formDataValues.name.value,
        phone: formDataValues.phone.value.replace(/\D/g, ''),
      };

      user.cpf = user.cpf.replace(/\D/g, '');
      user.phone = user.phone.replace(/\D/g, '');

      if (props.editing && props.indexUser !== undefined) {
        editUserByIndex(props.indexUser, user);
      } else {
        createUser(user);
      }

      useSnackbarStore().displaySnackbar({ message: 'Usuário alterado com sucesso!', type: 'success' });

      router.push({ name: 'user-list' });
    }, 1000);
  } else {
    useSnackbarStore().displaySnackbar({ message: 'Por favor, corrija os erros antes de enviar.', type: 'error' });
  }
};

onMounted(() => {
  if (props.editing && props.indexUser !== undefined && !userToEdit.value) {
    useSnackbarStore().displaySnackbar({ message: 'Usuário não encontrado.', type: 'error' });
    router.push({ name: 'user-list' });
  }
});
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
        {{ props.editing ? 'Editar Usuário' : 'Cadastrar Usuário' }}
      </BaseButton>

      <RouterLink :to="{ name: 'user-list' }" class="text-xs sm:text-md link text-center">
        Voltar à Lista de Usuários
      </RouterLink>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use '@assets/styles/_theme.scss' as *;

.link {
  color: $primary-color;

  &:hover {
    opacity: 0.7;
  }
}
</style>