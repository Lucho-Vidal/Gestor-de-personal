import {RouteRecordRaw,createRouter,createWebHistory} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Home.vue')

    },
    {
        path: '/buscador',
        name: 'Buscador',
        component: () => import('@/components/BuscadorTrenes.vue')
    },
    {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/components/Personal.vue')
    },
    {
        path:'/novedades',
        name:'Novedades',
        component:()=> import('@/components/Novedades.vue')
    },
    {
        path:'/NewNovedades',
        name:'NewNovedades',
        component:()=> import('@/components/NewNovedades.vue')
    },
    {
        path:'/editNovedades',
        name:'editNovedades',
        component:()=> import('@/components/EditNovedades.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;