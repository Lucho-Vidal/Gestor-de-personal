<template>
    <router-view/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App",
    watch: {
    $route(to) {
            document.title = to.meta.title || 'GNPA '; // Usar un título predeterminado si no hay meta.title
        }
    },
    components: {
        
    },
});
</script>

<style></style>
