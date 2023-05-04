<template>
    <div>
        <NavBar/>
        <div class="container">
            <h1>Home</h1>
        <p>
            Esta es una aplicación desarrollada por personal de control trenes linea Roca, para control trenes linea Roca.
            Su usu esta sujeto a aprobación de los mismos.
        </p>
        </div>
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
});
</script>