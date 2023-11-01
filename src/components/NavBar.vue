<template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div
            class="container-fluid container d-flex flex-wrap justify-content-between"
        >
            <router-link class="navbar-brand" to="/"
                >GNPA - Trenes Argentinos</router-link
            >
            <div v-if="login">
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li
                            class="nav-item"
                            v-if="
                                rolMayor == 'moderator' ||
                                rolMayor == 'admin' ||
                                rolMayor == 'user'
                            "
                        >
                            <h5 class="mt-2">{{ username }} |</h5>
                        </li>
                        <li
                            class="nav-item"
                            v-if="
                                rolMayor == 'moderator' ||
                                rolMayor == 'admin' ||
                                rolMayor == 'user'
                            "
                        >
                            <router-link class="nav-link" to="/"
                                >Home</router-link
                            >
                        </li>
                        <li
                            class="nav-item"
                            v-if="
                                rolMayor == 'moderator' ||
                                rolMayor == 'admin' ||
                                rolMayor == 'user'
                            "
                        >
                            <router-link class="nav-link" to="/buscador"
                                >Buscador</router-link
                            >
                        </li>
                        <li
                            class="nav-item"
                            v-if="
                                rolMayor == 'moderator' ||
                                rolMayor == 'admin' ||
                                rolMayor == 'user'
                            "
                        >
                            <router-link class="nav-link" to="/Sabana"
                                >Sabana</router-link
                            >
                        </li>
                        <li
                            class="nav-item"
                            v-if="
                                rolMayor == 'moderator' || rolMayor == 'admin'
                            "
                        >
                            <router-link class="nav-link" to="/personal"
                                >Personal</router-link
                            >
                        </li>
                        <li
                            class="nav-item"
                            v-if="
                                rolMayor == 'moderator' || rolMayor == 'admin'
                            "
                        >
                            <router-link class="nav-link" to="/novedades"
                                >Novedades</router-link
                            >
                        </li>
                        <li
                            class="nav-item"
                            v-if="rolMayor == 'admin'
                            "
                        >
                            <router-link class="nav-link" to="/users"
                                >Usuarios</router-link
                            >
                        </li>
                        <li class="nav-item" v-if="login">
                            <button
                                class="btn btn-secondary"
                                v-on:click="logOut"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getRoles } from "../services/signService";

export default defineComponent({
    data() {
        return {
            login: false as boolean,
            username: "" as string,
            roles: [] as string[],
            rolMayor: "" as string,
        };
    },
    methods: {
        logOut() {
            localStorage.clear();
            this.rolMayor = "";
            this.$router.push("/login");
        },
        getRol() {
            if (
                getRoles().length == 0 &&
                localStorage.getItem("roles") != null
            ) {
                this.roles = localStorage.getItem("roles")?.split(",") || [];
            } else {
                this.roles = getRoles();
            }
        },
        getRolMayor() {
            this.rolMayor =
                this.roles.find((rol: string) => rol == "admin") ||
                this.roles.find((rol: string) => rol == "moderator") ||
                this.roles.find((rol: string) => rol == "user") ||
                "";
        },
    },
    created() {
        this.login = localStorage.getItem("token") ? true : false;
        this.username = localStorage.getItem("username") || "";
        this.getRol();
        this.getRolMayor();
    },
    beforeUnmount(){
        this.rolMayor = "";
    }
});
</script>

<style>
nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #333;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
}
</style>
