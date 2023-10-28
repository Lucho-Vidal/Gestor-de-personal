<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Crear nuevo Usuario
            </h1>
            <div
                class="alert row d-flex align-content-center justify-content-center nowrap"
                :class="[
                    message.status == 'danger'
                        ? 'alert-danger'
                        : message.status == 'success'
                        ? 'alert-success'
                        : '',
                ]"
                role="alert"
                v-if="message.status == 'danger' || message.status == 'success'"
            >
                <h4 class="alert-heading col-5">{{ message.title }}</h4>
                <hr />
                <p class="col-5">
                    {{ message.message }}
                </p>
                
            </div>
            <form
                name="form"
                id="form"
                v-on:submit.prevent="procesar()"
                class="d-flex justify-content-center mb-5"
            >
                <div class="input-group-text col-5 row p-5">
                    <div>
                        <label
                            for="number"
                            class="mb-3 text-start"
                            style="width: 100%"
                        >
                            Legajo:
                            <input
                                type="number"
                                name="legajo"
                                placeholder="Legajo"
                                class="form-control mb-3 text-center"
                                v-model="user.legajo"
                                autocomplete="off"
                                autofocus
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label
                            for="email"
                            class="mb-3 text-start"
                            style="width: 100%"
                        >
                            Apellido y Nombre:
                            <input
                                type="text"
                                name="username"
                                placeholder="Apellido y nombre"
                                class="form-control mb-3 text-center"
                                v-model="user.username"
                                autocomplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label
                            for="email"
                            class="mb-3 text-start"
                            style="width: 100%"
                        >
                            Email
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                class="form-control mb-3 text-center"
                                v-model="user.email"
                                autocomplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label
                            for="password"
                            class="mb-3 text-start"
                            style="width: 100%"
                        >
                            Password
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                class="form-control mb-3 text-center"
                                v-model="user.password"
                                autocomplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div class="col">
                        <label for="rol" class="text-start" style="width: 100%">
                            Rol
                            <select
                                name="rol"
                                id="rol"
                                class="form-control mb-3 text-center"
                                v-model="rol"
                            >
                                <option value="user">Usuario</option>
                                <option value="moderator">Supervisor</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Crear Usuario"
                            name="Crear Usuario"
                            class="btn btn-primary col-5"
                        />
                    </div>
                </div>
            </form>
            <div v-if="rol.includes('user')" class="text-center  ">
                
                    <h3 class="text-center">Usuario:</h3>
                <p class="text-center">
                    Tiene acceso a:
                </p>
                <div class="d-flex align-content-center justify-content-center nowrap">
                <ul class="text-center list-group  col-5">
                    <li class="list-group-item">
                        Buscador de trenes
                    </li>
                    <li class="list-group-item">
                        Sabana de trenes
                    </li>
                </ul>
                </div>
            </div>
            <div v-if="user.roles.includes('moderator')">
                <h3 class="text-center">Supervisor:</h3>
                <p class="text-center">
                    Tiene acceso a:
                </p>
                <div class="d-flex align-content-center justify-content-center nowrap">
                <ul class="text-center list-group  col-5">
                    <li class="list-group-item">
                        Buscador de trenes
                    </li>
                    <li class="list-group-item">
                        Sabana de trenes
                    </li>
                    <li class="list-group-item">
                        Personal
                    </li>
                    <li class="list-group-item">
                        Novedades
                    </li>
                </ul>
                </div>
            </div>

            <div v-if="user.roles.includes('admin')">
                <h3 class="text-center">Administrador: </h3>
                <p class="text-center">
                    Tiene acceso a:
                </p>
                <div class="d-flex align-content-center justify-content-center nowrap">
                <ul class="text-center list-group  col-5">
                    <li class="list-group-item">
                        Buscador de trenes
                    </li>
                    <li class="list-group-item">
                        Sabana de trenes
                    </li>
                    <li class="list-group-item">
                        Personal
                    </li>
                    <li class="list-group-item">
                        Novedades
                    </li>
                    <li class="list-group-item">
                        Administración de Usuarios
                    </li>
                </ul>
                </div>
            </div>

            
        </main>
        <FooterPage />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { signUp } from "../../services/signService";
import { User } from "../../interfaces/IUser";

export default defineComponent({
    name: "editPersonal",

    data() {
        return {
            rol:'' as string,
            user: {
                roles: [""],
            } as User,
            message: {
                status: "",
                title: "",
                message: "",
            },
        };
    },
    methods: {
        async procesar() {
            try {
                this.user.roles[0] = this.rol;                
                const res = await signUp(this.user);

                if (res.status === 200) {
                    
                    this.message = {
                        status: "success",
                        title: "ATENCIÓN!",
                        message:
                            "Hola " +
                            localStorage.getItem("username") +
                            ", El inicio de sesión fue exitoso. seras redirigido en un momento...",
                    };
                    this.user.legajo = 0;
                    this.user.username = "";
                    this.user.email = "";
                    this.user.password = "";
                    this.user.roles = [""];
                
                    setTimeout(() => (this.message.status = ""), 10000);
                }
            } catch (error) {
                this.message = {
                    status: "danger",
                    title: "ATENCIÓN!",
                    message: "Los datos ingresados no son validos.",
                };
                this.user.legajo = 0;
                this.user.username = "";
                this.user.email = "";
                this.user.password = "";
                this.user.roles = [""];
                
                setTimeout(() => (this.message.status = ""), 10000);
            }
        },
    },
    components: {
        NavBar,
        FooterPage,
    },
});
</script>

<style>
main {
    min-height: 81.6vh;
}
</style>
