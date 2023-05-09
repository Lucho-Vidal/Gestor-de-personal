<template>
    <div>
        <NavBar/>
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Home
            </h1>
        <p>
            Esta es una aplicación desarrollada por personal de control trenes linea Roca, para control trenes linea Roca.
            Su uso esta sujeto a aprobación de los mismos.
        </p>
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
});
</script>
<style>
main {
    min-height: 81.6vh;
}</style>