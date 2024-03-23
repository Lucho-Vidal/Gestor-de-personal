<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Cambiar Contraseña
            </h1>
            <form
                name="form"
                id="form"
                v-on:submit.prevent="procesar()"
                class="d-flex justify-content-center mb-5"
            >
                <div class="input-group-text col-5 row p-5">
                    <label for="password" class="mb-3" style="width: 100%">
                        Contraseña actual
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            name="password"
                            placeholder="Contraseña actual"
                            class="form-control mb-3"
                            v-model="currentPassword"
                            autocomplete="off"
                            required
                        />
                    </label>
                    <label for="password" class="mb-3" style="width: 100%">
                        Nueva Contraseña
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            name="password"
                            placeholder="Nueva Contraseña"
                            class="form-control mb-3"
                            v-model="newPassword"
                            autocomplete="off"
                            required
                        />
                    </label>
                    <div>
                        <label for="password" class="mb-3" style="width: 100%">
                            Repetir Contraseña
                            <input
                                :type="showPassword ? 'text' : 'password'"
                                name="password"
                                placeholder="Repetir Contraseña"
                                class="form-control mb-3"
                                v-model="repeatedPassword"
                                autocomplete="off"
                                required
                            />
                            <button
                                type="button"
                                class="btn btn-outline-secondary"
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
                    <div>
                        <input
                            type="submit"
                            value="Cambiar Contraseña"
                            name="Cambiar Contraseña"
                            class="btn btn-primary col-5"
                        />
                    </div>
                </div>
            </form>
            <div
                class="alert row"
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
                <h4 class="alert-heading">{{ message.title }}</h4>
                <hr />
                {{ message.message }}
            </div>
        </main>
        <FooterPage />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { changePassword } from "../../services/signService";
import { User } from "../../interfaces/IUser";

export default defineComponent({
    name: "editPersonal",

    data() {
        return {
            user: {
                password: "",
            } as User,
            currentPassword: "",
            newPassword: "",
            repeatedPassword: "",
            showPassword: false,
            message: {
                status: "",
                title: "",
                message: "",
            },
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async procesar() {
            try {
                if (this.newPassword !== this.repeatedPassword) {
                    this.message = {
                        status: "danger",
                        title: "ATENCIÓN!",
                        message: "Las contraseñas no coinciden.",
                    };
                    return;
                }
                if (this.currentPassword === this.newPassword) {
                    this.message = {
                        status: "danger",
                        title: "ATENCIÓN!",
                        message: "La nueva contraseña no puede ser la misma que la anterior.",
                    };
                    return;
                }

                const res = await changePassword(this.currentPassword,this.newPassword);

                if (res.status === 200) {
                    this.message = {
                        status: "success",
                        title: "ATENCIÓN!",
                        message:
                            "Hola " +
                            localStorage.getItem("username") +
                            ", La contraseña fue cambiada correctamente. En un instante seras redirigido....",
                    };
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 5000);
                }
            } catch (error) {
                this.message = {
                    status: "danger",
                    title: "ATENCIÓN!",
                    message: "Los datos ingresados no son validos.",
                };
                this.user.email = "";
                this.user.password = "";
                setTimeout(() => (this.message.status = ""), 5000);
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
    margin-top: 5rem;
}
</style>
