import {ref, shallowRef} from 'vue';
import {useSnackbarStore} from "@store/snackbarStore.ts";
import {defineStore} from 'pinia';
import {UserService} from "@/services/UserService.ts";
import type {User} from "@/services/UserService.ts";

const localStorageUsersKey = 'users';

function geLocalStorageUsers(): User[] | null {
    const storedValue = localStorage.getItem(localStorageUsersKey);
    if (!storedValue) {
        return null;
    }

    try {
        return JSON.parse(storedValue) as User[] | null;
    } catch (e) {
        return null;
    }
}

function saveLocalStorageUsers(users: User[]): void {
    localStorage.setItem(localStorageUsersKey, JSON.stringify(users));
}

export const useUsersStore = defineStore('users', () => {
    const users = ref<User[] | null>(geLocalStorageUsers());
    const loading = shallowRef<boolean>(false);
    const initialLoading = shallowRef<boolean>(true);

    const finishLoad = () => setTimeout(() => {
        loading.value = false;
        initialLoading.value = false;
    }, 1000);

    async function loadUsers(): Promise<void> {
        loading.value = true;

        return await UserService.getUsers()
            .then((response: User[]) => {
                users.value = response;
                saveLocalStorageUsers(users.value)
            }).finally(() => {
                finishLoad()
            })
    }

    async function fetchUsers(): Promise<void> {
        loading.value = true;

        if (users.value) {
            finishLoad();
            return;
        }

        await loadUsers();
    }

    function createUser(user: User): void {
        if (users.value) {
            users.value.push(user);
            saveLocalStorageUsers(users.value);
        }
    }

    function deleteUserByIndex(index: number): void {
        if (users.value) {
            users.value.splice(index, 1);
            saveLocalStorageUsers(users.value);
            useSnackbarStore().displaySnackbar({message: 'Usuário deletado com sucesso!', type: 'success'});
        }
    }

    function getUserByIndex(index: number): User | null {
        return users.value ? users.value[index] || null : null;
    }

    function editUserByIndex(index: number, user: User): void {
        if (users.value) {
            users.value[index] = user;
            saveLocalStorageUsers(users.value);
        }
    }

    return {
        users,
        loading,
        initialLoading,
        fetchUsers,
        createUser,
        deleteUserByIndex,
        reloadUsers: loadUsers,
        getUserByIndex,
        editUserByIndex,
    };
});