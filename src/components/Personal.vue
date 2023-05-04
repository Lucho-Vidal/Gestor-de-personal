<template>
    <div>
        <NavBar />
        <div class="container">
            <h1 class="d-flex justify-content-center m-3">Personal</h1>
        </div>
        <FooterPage />
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
        FooterPage,
    },
});
</script>
<style>
footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px; /* ajustar el valor según sea necesario */
}
</style>
