<template>
    <div>
        <NavBar/>
        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import FooterPage from './FooterPage.vue'

export default defineComponent({
    name: "App",
    components: {
        NavBar,
        FooterPage
    },

})

</script>