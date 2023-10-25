<template>
    <div>
        <NavBar/>
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Gestión de Novedades del Personal de Abordo
            </h1>
        <p>
            Esta es una aplicación que fue desarrollada por personal de control trenes de la linea Roca para la gestión del personal de abordo. 
        </p>

        

        <p>Ante cualquier inconveniente comuníquese con el administrador o envié un mail a: <a href="mailto:luciano.vidal@trenesargentinos.gob.ar">luciano.vidal@trenesargentinos.gob.ar</a></p>
        </main>
        <FooterPage/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import FooterPage from "./FooterPage.vue";

export default defineComponent({
    name: "App",
    components: {
        NavBar,
        FooterPage
    },
    data(){
        return{

        }
    },
    methods:{},
    /* mounted(){
        newToken();
    } */
});
</script>
<style>
    main {
        min-height: 81.6vh;
    }
</style>