<template>
    <div>
        <NavBar/>
        <h1>Home</h1>
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