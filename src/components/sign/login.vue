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
                        <label for="email" class="mb-3" style="width: 300px">
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
                        <label for="password" class="mb-3" style="width: 300px">
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
        </main>
        <FooterPage />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { signIn } from '../../services/signService';
import { User } from '../../interfaces/IUser';
import axios from "axios";

export default defineComponent({
    name: "editPersonal",

    data() {
        return {
            user: {
                email: "",
                password: "",
            } as User,
        };
    },
    methods: {
        async procesar() {
            try{
                const res = await axios.post(
                    "http://localhost:3000/api/auth/signin",
                    {
                        email:"luciano.vidal@trenesargentinos.gob.ar",
                        password:"lucho777"
                    },
                    //console.log(res.data);
                    
                )
            }catch(error){
                console.log(error);
                
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
    
</style>
