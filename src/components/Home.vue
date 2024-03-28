<template>
        <div id="sb-nav-fixed">
            <NavBar @update:isAsideBarVisible="handleAsideBarVisibility"/>
            <asideBar v-if="isAsideBarVisible"/>
            <div id="layoutSidenav_content"
                class="body" 
                :class="[isAsideBarVisible ? 'layoutSidenav_content-width-max':'layoutSidenav_content-width-min']">
                <main>
                    <div  class="container-fluid px-4">
                        <h1 class="d-flex justify-content-center m-3">
                            Gestión de Novedades del Personal de Abordo
                        </h1>
                        <p>
                            Esta es una aplicación que fue desarrollada por personal de control trenes de la linea Roca para la gestión del personal de abordo. 
                        </p>
                        <p>Ante cualquier inconveniente comuníquese con el administrador o envié un mail a: <a href="mailto:luciano.vidal@trenesargentinos.gob.ar">luciano.vidal@trenesargentinos.gob.ar</a></p>
                        
                    </div>
                </main>
                <FooterPage/>
            </div>
        </div>
</template>

<script lang="ts">
import { defineComponent, ref  } from "vue";
import NavBar from "./NavBar.vue";
import asideBar from "./asideBar.vue";
import FooterPage from "./FooterPage.vue";

export default defineComponent({
    name: "App",
    components: {
        NavBar,
        asideBar,
        FooterPage
    },
    data(){
        return{
        }
    },
    setup() {
        const isAsideBarVisible = ref(false); // Estado inicial visible
        function toggleAsideBar() {
            console.log(isAsideBarVisible);
            isAsideBarVisible.value = !isAsideBarVisible.value; // Cambia el estado de isAsideBarVisible
        }
        

        return {isAsideBarVisible,toggleAsideBar};
    },
    methods:{
        handleAsideBarVisibility(isVisible: boolean) {
            this.isAsideBarVisible = isVisible;
        },
    },
    created(){
        
    }
    
});
</script>
<style>
    
</style>