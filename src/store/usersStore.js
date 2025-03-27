import {ref, shallowRef} from 'vue';
import {defineStore} from 'pinia';
import {UserService} from "@/UserService.js";
import {useSnackbarStore} from "@store/snackbarStore.js";

const localStorageUsersKey = 'users';

function geLocalStorageUsers() {
    const storedValue = localStorage.getItem(localStorageUsersKey);
    let parsedJSON;

    try {
        parsedJSON = JSON.parse(storedValue)
    } catch (e) {
        parsedJSON = null
    }

    return parsedJSON ? parsedJSON : null;
}

function saveLocalStorageUsers(users) {
    localStorage.setItem(localStorageUsersKey, JSON.stringify(users));
}

export const useUsersStore = defineStore('users', () => {
    const users = ref(geLocalStorageUsers());
    const loading = shallowRef(false)
    const initialLoading = shallowRef(true)

    const finishLoad = () => setTimeout(() => {
        loading.value = false;
        initialLoading.value = false;
    }, 1000)


    async function loadUsers() {
        loading.value = true;

        return await UserService.getUsers()
            .then(response => {
                users.value = response;
                saveLocalStorageUsers(users.value)
            }).finally(() => {
                finishLoad()
            })
    }

    async function fetchUsers() {
        loading.value = true;

        if (users.value) {
            finishLoad()
            return
        }

        await loadUsers()
    }

    function registerUser(user) {
        users.value.push(user)

        saveLocalStorageUsers(users.value)
    }

    function deleteUserByIndex(index) {
        users.value.splice(index, 1)

        saveLocalStorageUsers(users.value)

        useSnackbarStore().displaySnackbar({message: 'Usuário deletado com sucesso!', type: 'success'});
    }

    function getUserByIndex(index) {
        return users.value[index] || null
    }

    function editUserByIndex(index, user) {
        users.value[index] = user

        saveLocalStorageUsers(users.value)
    }

    return {
        users,
        loading,
        initialLoading,
        fetchUsers,
        registerUser,
        deleteUserByIndex,
        reloadUsers: loadUsers,
        getUserByIndex,
        editUserByIndex
    }
})