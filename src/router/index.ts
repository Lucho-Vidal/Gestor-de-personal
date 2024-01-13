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
    const roles = localStorage.getItem('roles')?.split(',')||[]
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
        path: "/changePassword",
        name: "changePassword",
        component: () => import("@/components/sign/changePassword.vue"),
        beforeEnter: requireAuth
    },
    {
        path: "/users",
        name: "users",
        component: () => import("@/components/sign/lstUsers.vue"),
        beforeEnter: requireAdmin,
    },
    {
        path: "/newUser",
        name: "newUser",
        component: () => import("@/components/sign/newUser.vue"),
        beforeEnter: requireAdmin,
    },
    {
        path: "/editUser/:id",
        name: "editUser",
        component: () => import("@/components/sign/editUser.vue"),
        beforeEnter: requireAdmin,
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
    {
        path: "/turnos",
        name: "Turnos",
        component: () => import("@/components/turnos/Turnos.vue"),
        beforeEnter: (to, from, next) => {
            requireAuth(to, from, () => requireAdmin(to, from, next));
        }
    },
    {
        path: "/newTurno",
        name: "newTurno",
        component: () => import("@/components/turnos/NewTurno.vue"),
        beforeEnter: (to, from, next) => {
            requireAuth(to, from, () => requireAdmin(to, from, next));
        }
    },
    {
        path: "/editTurno/:id",
        name: "editTurno",
        component: () => import("@/components/turnos/EditTurno.vue"),
        beforeEnter: (to, from, next) => {
            requireAuth(to, from, () => requireAdmin(to, from, next));
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
