<template>
    <div>
        <NavBar />

        <main class="container">
            <h1 class="d-flex justify-content-center m-3">Cargar Nueva Novedad</h1>
            <form @submit.prevent="saveNovedad()">
                <input
                    class="form-control mb-3"
                    placeholder="Write a title"
                    type="title"
                    
                    autofocus
                />
                <textarea
                    class="form-control mb-3"
                    placeholder="Write a Description"
                    rows="3"
                    
                ></textarea>
                <button
                    class="btn btn-primary w-100"
                >
                    Guardar
                </button>
            </form>
        </main>

        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import FooterPage from "./FooterPage.vue";

export default defineComponent({
    data() {
        return {};
    },
    methods: {
        saveNovedad() {
            console.log("hola desde Save");
        },
    },
    name: "App",
    components: {
        NavBar,
        FooterPage,
    },
});
</script>
<style>
main {
    min-height: 87vh;
}
</style>
