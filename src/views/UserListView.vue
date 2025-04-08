<script setup lang="ts">
import BaseLoading from "@components/BaseLoading.vue";
import BaseButton from "@components/BaseButton.vue";
import {useUsersStore} from "@store/usersStore";
import {storeToRefs} from "pinia";
import PageHeader from "@components/PageHeader.vue";
import {formatCPF, formatPhoneNumber} from "../utils/string";

const usersStore = useUsersStore()
const {deleteUserByIndex, reloadUsers} = usersStore

const {users, loading, initialLoading} = storeToRefs(usersStore)
</script>

<template>
  <div class="w-full flex flex-col gap-3 sm:gap-6">
    <div class="flex max-sm:flex-col justify-between max-md:items-start gap-2">
      <PageHeader>
        Lista de Usuários
      </PageHeader>

      <div class="flex gap-2 sm:gap-4 max-md:justify-end max-sm:w-full">
        <BaseButton v-if="(users?.length === 0 || loading) && !initialLoading" @click="reloadUsers" :loading="loading">
          Recarregar Usuários
        </BaseButton>

        <RouterLink :to="{name: 'user-register'}">
          <BaseButton>
            Novo Usuário
          </BaseButton>
        </RouterLink>
      </div>
    </div>

    <div class="flex w-full justify-center" v-if="loading">
      <BaseLoading size="5xl"/>
    </div>

    <div v-else class="flex flex-col gap-4 sm:gap-6">
      <template v-for="(user, index) in users" :key="users.cpf">
        <div class="flex items-start justify-between p-6 rounded-lg shadow-lg card-user">
          <div class="flex flex-col gap-1 text-xs sm:text-sm">
            <span class="font-medium text-lg mb-1">{{ user.name }}</span>
            <span>{{ formatCPF(user.cpf) }}</span>
            <span>{{ user.email }}</span>
            <span>{{ formatPhoneNumber(user.phone) }}</span>
          </div>

          <div class="flex text-xs sm:text-sm cursor-pointer font-medium gap-4">
            <RouterLink class="action-edit" :to="{name: 'user-edit', params: {indexUser: index}}">
              Editar
            </RouterLink>
            <span class="action-delete" @click="deleteUserByIndex(index)">Excluir</span>
          </div>
        </div>
      </template>
      <span v-if="users?.length === 0" class="text-center text-xs sm:text-sm">
        Nenhum usuário cadastrado.
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@assets/styles/_theme.scss';

.card-user {
  background-color: $white-color;
}

.action-edit {
  color: $primary-color;

  &:hover {
    opacity: 0.7;
  }
}


.action-delete {
  color: $input-invalid-color;

  &:hover {
    opacity: 0.7;
  }
}

</style>