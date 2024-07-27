<template>
    <main>
        <div class="container-fluid px-4">
            <h1 class="d-flex justify-content-center m-3">
                Gestión de Novedades del Personal de Abordo
            </h1>
            <p>
                Esta es una aplicación que fue desarrollada por personal de
                control trenes de la linea Roca para la gestión del personal de
                abordo.
            </p>
            <p>
                Ante cualquier inconveniente comuníquese con el administrador o
                envié un mail a:
                <a href="mailto:luciano.vidal@trenesargentinos.gob.ar"
                    >luciano.vidal@trenesargentinos.gob.ar</a
                >
            </p>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App",
    components: {
    },
    data() {
        return {};
    },
    methods: {
    },
    created() {},
});
</script>
<style>
main {
  margin-top: 4rem;
}
</style>
