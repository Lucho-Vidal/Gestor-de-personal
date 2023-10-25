<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">Inicio de Sesión</h1>
            <form
                name="form"
                id="form"
                v-on:submit.prevent="procesar()"
                class="d-flex justify-content-center mb-5"
            >
                <div class="input-group-text col-5 row p-5">
                    <div>
                        <label for="email" class="mb-3  text-align: center" style="width: 100%">
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                class="form-control mb-3"
                                v-model="user.email"
                                autofocus
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label for="password" class="mb-3" style="width: 100%">
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                class="form-control mb-3"
                                v-model="user.password"
                                autocomplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Iniciar Sesión"
                            name="Iniciar Sesión"
                            class="btn btn-primary col-5"
                        />
                    </div>
                </div>
            </form>
            <div
                    class="alert  row"
                    
                    :class="[message.status=='danger'?'alert-danger':message.status=='success'?'alert-success':'']"
                    role="alert"
                    v-if="message.status == 'danger'|| message.status == 'success'"
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
import { setRoles, signIn } from '../../services/signService';
import { User } from '../../interfaces/IUser';

export default defineComponent({
    name: "editPersonal",

    data() {
        return {
            user: {} as User,
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
                const res = await signIn(this.user);

                if (res.status === 200) {
                    window.localStorage.setItem("token", res.data.token);
                    window.localStorage.setItem("username", res.data.username);
                    window.localStorage.setItem("roles", res.data.role);
                    setRoles(res.data.role); 
                    this.message = {
                        status: "success",
                        title: "ATENCIÓN!",
                        message: "Hola "+localStorage.getItem('username')+", El inicio de sesión fue exitoso. seras redirigido en un momento...",
                    };
                    setTimeout(()=> {
                        
                        this.$router.push('/')
                    },3500)
                    
                }
            } catch (error) {
                this.message = {
                    status: "danger",
                    title: "ATENCIÓN!",
                    message: "Los datos ingresados no son validos.",
                };
                this.user.email = "";
                this.user.password = "";
                setTimeout(()=> this.message.status = '' ,5000)
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
