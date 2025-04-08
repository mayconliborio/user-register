export class UserService {
    static async getUsers() {
        return await fetch('https://private-9d65b3-tinnova.apiary-mock.com/users')
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                return await response.json();
            })
    }
}