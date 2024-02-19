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
                    <div class="col">
                        <label for="rol" class="text-start" style="width: 100%">
                            Rol
                            <select
                                name="rol"
                                id="rol"
                                class="form-control mb-3 text-center"
                                v-model="user.roles[0]"
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
            <div v-if="hasRole('user')" class="text-center">
                <h3 class="text-center">Usuario:</h3>
                <p class="text-center">Tiene acceso a:</p>
                <div
                    class="d-flex align-content-center justify-content-center nowrap"
                >
                    <ul class="text-center list-group col-5">
                        <li class="list-group-item">Buscador de trenes</li>
                        <li class="list-group-item">Sabana de trenes</li>
                    </ul>
                </div>
            </div>
            <div v-if="hasRole('moderator')">
                <h3 class="text-center">Supervisor:</h3>
                <p class="text-center">Tiene acceso a:</p>
                <div
                    class="d-flex align-content-center justify-content-center nowrap"
                >
                    <ul class="text-center list-group col-5">
                        <li class="list-group-item">Buscador de trenes</li>
                        <li class="list-group-item">Sabana de trenes</li>
                        <li class="list-group-item">Personal</li>
                        <li class="list-group-item">Novedades</li>
                    </ul>
                </div>
            </div>

            <div v-if="hasRole('admin')">
                <h3 class="text-center">Administrador:</h3>
                <p class="text-center">Tiene acceso a:</p>
                <div
                    class="d-flex align-content-center justify-content-center nowrap"
                >
                    <ul class="text-center list-group col-5">
                        <li class="list-group-item">Buscador de trenes</li>
                        <li class="list-group-item">Sabana de trenes</li>
                        <li class="list-group-item">Personal</li>
                        <li class="list-group-item">Novedades</li>
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
import { User, Role } from "../../interfaces/IUser";

export default defineComponent({
    name: "editPersonal",

    data() {
        return {
            user: {
                roles: [] as Role[],
            } as User,
            message: {
                status: "",
                title: "",
                message: "",
            },
        };
    },
    methods: {
        hasRole(roleName: string): boolean {
            return (
                Array.isArray(this.user.roles) &&
                this.user.roles.some((role) => role.name === roleName)
            );
        },
        async procesar() {
            try {
                this.user.password = "Inicio1";
                const res = await signUp(this.user);

                if (res.status === 200) {
                    this.message = {
                        status: "success",
                        title: "ATENCIÓN!",
                        message:
                            "Hola " +
                            localStorage.getItem("username") +
                            ", La creación del nuevo usuario fue exitosa, su contraseña sera Inicio1 y deberá ser cambiada en el primer inicio.",
                    };

                    setTimeout(() => (this.message.status = ""), 10000);
                    this.user.legajo = 0;
                    this.user.username = "";
                    this.user.email = "";
                    this.user.password = "";
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
