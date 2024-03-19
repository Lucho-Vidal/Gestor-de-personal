<template>
        <div id="sb-nav-fixed">
            <NavBar @update:isAsideBarVisible="handleAsideBarVisibility"/>
            <asideBar/>
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
import { defineComponent, ref , onBeforeMount } from "vue";
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
        const isAsideBarVisible = ref(true); // Estado inicial visible
        function toggleAsideBar() {
            isAsideBarVisible.value = !isAsideBarVisible.value; // Cambia el estado de isAsideBarVisible
        }
        onBeforeMount(() => {
            isAsideBarVisible.value = localStorage.getItem('sb|sidebar-toggle') === 'true';
        });

        return {isAsideBarVisible,toggleAsideBar};
    },
    methods:{
        handleAsideBarVisibility(isVisible: boolean) {
            this.isAsideBarVisible = isVisible;
        },
    },
    
});
</script>
<style>
    /* main {
        min-height: 81.6vh;
    } */
    .body{
        position: relative;
        padding: 5rem 0;
        min-height: 100vh;
    }
    #layoutSidenav_content{
        position:absolute;
        top:0;
        left: 0;
        z-index: 0;
        /* margin-top: 1rem; */
        /* margin-left: 250px; */
    }
    .layoutSidenav_content-width-min {
        margin-left: 0;
        width: 100vw;

    }
    .layoutSidenav_content-width-max {
        margin-left: 225px;
        width: calc(100vw - 225px);
        /* width: calc(100vw - 242px); */
    }
    @media (max-width: 991px) {
        .layoutSidenav_content-width-max {
        margin-left: 0px;
        width: 100%;
    }
    }
</style>