<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Cargar Nueva Novedad
            </h1>
            <form @submit.prevent="saveNovedad()" class="row">
                <div class="row">
                    <div class="col">
                        <label for="">
                            Legajo
                            <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="text"
                            autofocus
                        />
                        </label>
                        
                    </div>
                    <div class="col">
                        <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="title"
                            
                        />
                    </div>
                    <div class="col">
                        <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="title"
                            
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="title"
                            
                        />
                    </div>
                    <div class="col">
                        <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="title"
                            
                        />
                    </div>
                    <div class="col">
                        <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="title"
                            
                        />
                    </div>
                </div>
                console.log(window)
                <button class="btn btn-primary w-100">Guardar</button>
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
