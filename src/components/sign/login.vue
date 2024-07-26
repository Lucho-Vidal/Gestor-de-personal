<template>
    <main class="container">
        <div
            class="alert row"
            :class="[
                message.status == 'danger'
                    ? 'alert-danger'
                    : message.status == 'success'
                    ? 'alert-success'
                    : message.status == 'warning'
                    ? 'alert-warning'
                    : '',
            ]"
            role="alert"
            v-if="
                message.status == 'danger' ||
                message.status == 'success' ||
                message.status == 'warning'
            "
        >
            <h4 class="alert-heading">{{ message.title }}</h4>
            <hr />
            {{ message.message }}
        </div>
        <form
            name="form"
            id="form"
            v-on:submit.prevent="procesar()"
            class="d-flex justify-content-center mb-5"
        >
            <div class="input-group-text col-12 col-md-6 row p-3">
                <h1 class="mb-4 text-center">Inicio de Sesión</h1>
                <div class="col-12 mb-3">
                    <label for="email" class="w-100">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            class="form-control"
                            v-model="user.email"
                            autofocus
                            required
                        />
                    </label>
                </div>
                <div class="col-12 mb-3">
                    <label for="password" class="w-100">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            name="password"
                            placeholder="Password"
                            class="form-control"
                            v-model="user.password"
                            autocomplete="off"
                            required
                        />
                        <button
                            type="button"
                            class="btn btn-outline-secondary mt-2"
                            @click="togglePasswordVisibility"
                        >
                            {{
                                showPassword
                                    ? "Ocultar Contraseña"
                                    : "Mostrar Contraseña"
                            }}
                        </button>
                    </label>
                </div>
                <div class="col-12 d-flex justify-content-center">
                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        name="Iniciar Sesión"
                        class="btn btn-primary col-6"
                    />
                </div>
            </div>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { setRoles, signIn } from "../../services/signService";
import { User } from "../../interfaces/IUser";
import { Registro } from "../../interfaces/IRegistro";
import { createRegistro } from "../../services/registrosService";

export default defineComponent({
    name: "editPersonal",

    data() {
        return {
            user: {} as User,
            showPassword: false,
            message: {
                status: "",
                title: "",
                message: "",
            },
            today: new Date(),
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async procesar() {
            try {
                const res = await signIn(this.user);

                if (res.status === 200) {
                    window.localStorage.setItem("token", res.data.token);
                    window.localStorage.setItem("username", res.data.username);
                    window.localStorage.setItem("roles", res.data.role);
                    setRoles(res.data.role);

                    // guardamos registro
                    const registro: Registro = {
                        usuario: res.data.username,
                        fecha: this.today.toString(),
                        accion: "Inicio Sesion",
                    };
                    await createRegistro(registro);

                    if (res.data.updatePass) {
                        this.message = {
                            status: "warning",
                            title: "ATENCIÓN!",
                            message:
                                "Hola " +
                                localStorage.getItem("username") +
                                ", El inicio de sesión fue exitoso, Pero tu clave se encuentra vencida. Por favor cámbiala...",
                        };
                        setTimeout(() => {
                            this.$router.push("/changePassword");
                        }, 3000);
                    } else {
                        this.message = {
                            status: "success",
                            title: "ATENCIÓN!",
                            message:
                                "Hola " +
                                localStorage.getItem("username") +
                                ", El inicio de sesión fue exitoso. seras redirigido en un momento...",
                        };
                        setTimeout(() => {
                            this.$router.push("/");
                        }, 1000);
                    }
                }
            } catch (error) {
                this.message = {
                    status: "danger",
                    title: "ATENCIÓN!",
                    message: "Los datos ingresados no son validos.",
                };
                // this.user.email = "";
                this.user.password = "";
                setTimeout(() => (this.message.status = ""), 5000);
            }
        },
    },
    components: {},
});
</script>

<style>
main {
    margin-top: 5rem;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>
