import {createRouter, createWebHistory} from 'vue-router';

const index = [
    {
        path: '/',
        redirect: {name: 'user-list'},
        children: [
            {
                path: 'user-list',
                name: 'user-list',
                meta: {
                    title: 'Usuários',
                },
                component: async () => await import('@views/UserListView.vue')
            },
            {
                path: 'user-register',
                name: 'user-register',
                meta: {
                    title: 'Usuários - Cadastro',
                },
                component: async () => await import('@views/UserRegisterView.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: {name: 'user-list'},
    }
];

const router = new createRouter({
    history: createWebHistory(),
    routes: index,
    linkExactActiveClass: 'active',
});

router.beforeEach((to) => {
    document.title = to.meta.title || 'Usuários';
});

export default router;