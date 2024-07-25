<template>
    <main ref="pdfContainer">
        <embed
            :src="rutaPdf"
            type="application/pdf"
            width="100%"
            height="100%"
        />
    </main>
</template>
<script lang="ts">
import { defineComponent,ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
    name: "pdf",
    props: {
        rutaPdf: String,
    },
    computed: {},
    components: {
    },
    data() {
        return {};
    },
    setup() {
        const isAsideBarVisible = ref(false); // Estado inicial visible
        const rutaPdf = ref("");
        const pdfContainer = ref<HTMLElement | null>(null); // Referencia al contenedor del PDF
        const route = useRoute(); // Acceso a la ruta actual

        // Watcher para detectar cambios en rutaPdf
        watch(route, (newValue) => {
            // Eliminar el PDF anterior
            const container = pdfContainer.value;

            if (container) {
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            }
            // Crear y agregar un nuevo elemento <embed> con la nueva ruta PDF
            const embedElement = document.createElement("embed");
            embedElement.setAttribute("type", "application/pdf");
            embedElement.setAttribute("width", "100%");
            embedElement.setAttribute("height", "100%");
            embedElement.setAttribute(
                "src",
                Array.isArray(newValue.params.rutaPdf)
                    ? newValue.params.rutaPdf[0]
                    : newValue.params.rutaPdf
            );
            if (container) {
                container.appendChild(embedElement);
            }
        });

        function toggleAsideBar() {
            isAsideBarVisible.value = !isAsideBarVisible.value; // Cambia el estado de isAsideBarVisible
        }
        // Obtener el valor de la ruta desde el parámetro
        // const instance = getCurrentInstance();
        // const route = instance?.proxy && instance.proxy.$route as RouteLocationNormalizedLoaded | undefined;

        if (route) {
            rutaPdf.value = Array.isArray(route.params.rutaPdf)
                ? route.params.rutaPdf[0]
                : route.params.rutaPdf || "";
        }
        return { isAsideBarVisible, toggleAsideBar, rutaPdf, pdfContainer };
    },
    methods: {
        handleAsideBarVisibility(isVisible: boolean) {
            this.isAsideBarVisible = isVisible;
        },
    },
    mounted() {},
});
</script>
<style>
.body {
    position: relative;
    padding: 3rem 0;
    min-height: 100vh;
}
main {
    height: 89vh;
    
  margin-top: 0rem;

}
</style>
