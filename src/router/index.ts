import { getRoles,  setRoles } from "@/services/signService";
import {
    RouteRecordRaw,
    createRouter,
    createWebHistory,
    RouteLocationNormalized,
    NavigationGuardNext
} from "vue-router";

// Middleware para verificar si el usuario está autenticado
function requireAuth(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    if (localStorage.getItem("token")) {
        if (to.path == '/'&& from.path == '/login'){
            location.reload();
        }  
        next();
    } else {
        next("/login");
    }
}

// Middleware para verificar si el usuario tiene el rol "moderator"
function requireModerator(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const roles = localStorage.getItem('roles')?.split(',')||[];
    if (roles.includes("moderator")) {
        next();
    } else {
        // Puedes redirigir a una página de error o a la página de inicio en caso de autorización insuficiente.
        next("/");
    }
}
function requireAdmin(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const roles = getRoles();
    if (roles.includes("admin")) {
        next();
    } else {
        // Puedes redirigir a una página de error o a la página de inicio en caso de autorización insuficiente.
        next("/");
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        redirect: '/'
    },
    {
        path: "/",
        name: "Home",
        component: () => import("@/components/Home.vue"),
        beforeEnter: requireAuth,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/components/sign/login.vue"),
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token")) {
                next("/");
            } else {
                next();
            }
        },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/components/sign/login.vue"),
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token")) {
                next("/");
            } else {
                next();
            }
        },
    },
    {
        path: "/buscador",
        name: "Buscador",
        component: () => import("@/components/appTrabajo/BuscadorTrenes.vue"),
        beforeEnter: requireAuth,
    },
    {
        path: "/Sabana",
        name: "Sabana",
        component: () => import("@/components/appTrabajo/SabanaTrenes.vue"),
        beforeEnter: requireAuth,
    },
    {
        path: "/personal",
        name: "Personal",
        component: () => import("@/components/personal/Personal.vue"),
        beforeEnter: (to, from, next) => {
            requireAuth(to, from, () => requireModerator(to, from, next));
        }
    },
    {
        path: "/newPersonal",
        name: "newPersonal",
        component: () => import("@/components/personal/newPersonal.vue"),
        beforeEnter: (to, from, next) => {
            requireAuth(to, from, () => requireModerator(to, from, next));
        }
    },
    {
        path: "/editPersonal/:id",
        name: "editPersonal",
        component: () => import("@/components/personal/editPersonal.vue"),
        beforeEnter: (to, from, next) => {
            requireAuth(to, from, () => requireModerator(to, from, next));
        }
    },
    {
        path: "/novedades",
        name: "Novedades",
        component: () => import("@/components/novedades/Novedades.vue"),
        beforeEnter: (to, from, next) => {
            requireAuth(to, from, () => requireModerator(to, from, next));
        }
    },
    {
        path: "/NewNovedades",
        name: "NewNovedades",
        component: () => import("@/components/novedades/NewNovedades.vue"),
        beforeEnter: (to, from, next) => {
            requireAuth(to, from, () => requireModerator(to, from, next));
        }
    },
    {
        path: "/editNovedades/:id",
        name: "editNovedades",
        component: () => import("@/components/novedades/EditNovedades.vue"),
        beforeEnter: (to, from, next) => {
            requireAuth(to, from, () => requireModerator(to, from, next));
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
