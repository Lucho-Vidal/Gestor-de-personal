import {RouteRecordRaw,createRouter,createWebHistory} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Home.vue')

    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/sign/login.vue')
    },
    {
        path: '/buscador',
        name: 'Buscador',
        component: () => import('@/components/BuscadorTrenes.vue')
    },
    {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/components/personal/Personal.vue')
    },
    {
        path:'/newPersonal',
        name:'newPersonal',
        component:()=> import('@/components/personal/newPersonal.vue')
    },
    {
        path:'/editPersonal/:id',
        name:'editPersonal',
        component:()=> import('@/components/personal/editPersonal.vue')
    },
    {
        path:'/novedades',
        name:'Novedades',
        component:()=> import('@/components/novedades/Novedades.vue')
    },
    {
        path:'/NewNovedades',
        name:'NewNovedades',
        component:()=> import('@/components/novedades/NewNovedades.vue')
    },
    {
        path:'/editNovedades/:id',
        name:'editNovedades',
        component:()=> import('@/components/novedades/EditNovedades.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;