import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';


const index: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: { name: 'user-list' },
        children: [
            {
                path: 'user-list',
                name: 'user-list',
                meta: {
                    title: 'Usuários',
                },
                component: async () => await import('@views/UserListView.vue'),
            },
            {
                path: 'user-register',
                name: 'user-register',
                meta: {
                    title: 'Cadastrar Usuário',
                },
                component: async () => await import('@views/UserRegisterView.vue'),
            },
            {
                path: 'user-edit/:indexUser',
                name: 'user-edit',
                props: (route) => ({
                    indexUser: Number(route.params.indexUser),
                }),
                meta: {
                    title: 'Editar Usuário',
                },
                component: async () => await import('@views/UserEditView.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'user-list' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: index,
    linkExactActiveClass: 'active',
});

router.beforeEach((to) => {
    document.title = (to.meta.title as string) || 'Usuários';
});

export default router;