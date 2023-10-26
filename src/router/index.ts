import { getRoles } from "@/services/signService";
import {RouteRecordRaw,createRouter,createWebHistory} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Home.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){ 
                next();
            }else{
                next('/login')
            }
        }

    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/sign/login.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){ 
                next('/');
            }else{
                next()
            }
        }
    },
    {
        path: '/buscador',
        name: 'Buscador',
        component: () => import('@/components/appTrabajo/BuscadorTrenes.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){ 
                next();
            }else{
                next('/login')
            }
        }
    },
    {
        path: '/Sabana',
        name: 'Sabana',
        component: () => import('@/components/appTrabajo/SabanaTrenes.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){ 
                next();
            }else{
                next('/login')
            }
        }
    },
    {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/components/personal/Personal.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){
                if(getRoles().length == 0){
                    next('/')
                }else{
                    getRoles().forEach(rol => {
                        if(rol == 'moderator'){
                        next();
                        }
                })
            }
            }else{
                next('/login')
            }
        }
    },
    {
        path:'/newPersonal',
        name:'newPersonal',
        component:()=> import('@/components/personal/newPersonal.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){
                if(getRoles().length == 0){
                    next('/')
                }else{
                    getRoles().forEach(rol => {
                        if(rol == 'moderator'){
                        next();
                        }
                })
            }
            }else{
                next('/login')
            }
        }
    },
    {
        path:'/editPersonal/:id',
        name:'editPersonal',
        component:()=> import('@/components/personal/editPersonal.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){
                if(getRoles().length == 0){
                    next('/')
                }else{
                    getRoles().forEach(rol => {
                        if(rol == 'moderator'){
                        next();
                        }
                })
            }
            }else{
                next('/login')
            }
        }
    },
    {
        path:'/novedades',
        name:'Novedades',
        component:()=> import('@/components/novedades/Novedades.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){
                if(getRoles().length == 0){
                    next('/')
                }else{
                    getRoles().forEach(rol => {
                        if(rol == 'moderator'){
                        next();
                        }
                })
            }
            }else{
                next('/login')
            }
        }
    },
    {
        path:'/NewNovedades',
        name:'NewNovedades',
        component:()=> import('@/components/novedades/NewNovedades.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){
                if(getRoles().length == 0){
                    next('/')
                }else{
                    getRoles().forEach(rol => {
                        if(rol == 'moderator'){
                        next();
                        }
                })
            }
            }else{
                next('/login')
            }
        }
    },
    {
        path:'/editNovedades/:id',
        name:'editNovedades',
        component:()=> import('@/components/novedades/EditNovedades.vue'),
        beforeEnter:(to,from,next)=>{
            if(localStorage.getItem('token')){
                if(getRoles().length == 0){
                    next('/')
                }else{
                    getRoles().forEach(rol => {
                        if(rol == 'moderator'){
                        next();
                        }
                })
            }
            }else{
                next('/login')
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;