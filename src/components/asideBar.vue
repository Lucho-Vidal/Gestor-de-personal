<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading" 
                                v-if="
                                    rolMayor == 'moderator' ||
                                    rolMayor == 'admin' ||
                                    rolMayor == 'user'"
                                    >Aplicaciones
                            <router-link class="nav-link" to="/buscador">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Buscador de trenes
                            </router-link>
                            <router-link class="nav-link" to="/listadoPersonales">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Listado de personal
                            </router-link>
                            <router-link class="nav-link" to="/" disabled>
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Sabana de trenes
                            </router-link>
                        </div>
                        <div class="sb-sidenav-menu-heading" 
                                v-if="
                                    rolMayor == 'moderator' ||
                                    rolMayor == 'admin'
                                    ">Administración de Personal
                            <router-link class="nav-link" to="/personal">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Base de personales
                            </router-link>
                            <router-link class="nav-link" to="/novedades">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Novedades de personal
                            </router-link>
                            <router-link class="nav-link" to="/" disabled>
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Sabana de trenes
                            </router-link>
                        </div>
                        <div class="sb-sidenav-menu-heading" 
                                v-if="
                                    rolMayor == 'admin'
                                    ">Administración del sistema
                            <router-link class="nav-link" to="/turnos">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Administración de turnos
                            </router-link>
                            <router-link class="nav-link" to="/users">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Administración de usuarios
                            </router-link>
                            <router-link class="nav-link" to="/" disabled>
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Registro de actividades
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- <div class="sb-sidenav-footer">
                    <div class="small">Logged in as:</div>
                    Start Bootstrap
                </div> -->
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getRoles } from "../services/signService";
// import "@/assets/styles.css";


export default defineComponent({
    data() {
        return {
            login: false as boolean,
            username: "" as string,
            roles: [] as string[],
            rolMayor: "" as string,
            isDropdownOpen: false
        };
    },
    methods: {
        toggleDropdown() {
            const dropdownMenu = this.$refs.dropdownMenu as HTMLElement;
            if (dropdownMenu) {
                // Alternar la clase para mostrar u ocultar el menú desplegable
                dropdownMenu.classList.toggle('show');
                // Alternar el estado de isDropdownOpen
                this.isDropdownOpen = !this.isDropdownOpen;
            }
        },
        closeDropdown(event: MouseEvent) {
            // Check if the click event is outside the dropdown
            const dropdownMenu = this.$el.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                if (!dropdownMenu.contains(event.target)) {
                    this.isDropdownOpen = false;
                }
            }
        },
        getRol() {
            if (
                getRoles().length == 0 &&
                localStorage.getItem("roles") != null
            ) {
                this.roles = localStorage.getItem("roles")?.split(",") || [];
            } else {
                this.roles = getRoles();
            }
        },
        getRolMayor() {
            this.rolMayor =
                this.roles.find((rol: string) => rol == "admin") ||
                this.roles.find((rol: string) => rol == "moderator") ||
                this.roles.find((rol: string) => rol == "user") ||
                "";
        },
    },
    created() {
        this.login = localStorage.getItem("token") ? true : false;
        this.username = localStorage.getItem("username") || "";
        this.getRol();
        this.getRolMayor();
    },
    mounted() {
        // Attach click event listener to document
        document.addEventListener('click', this.closeDropdown);
    },
    beforeUnmount() {
        this.rolMayor = "";
        // Remove click event listener when component is unmounted
        document.removeEventListener('click', this.closeDropdown);
    },
});
</script>

<style>
.dropdown-menu-custom{
    right: 0;
}
#layoutSidenav_nav{
    position: absolute;
    top:0;
    left: 0;
    z-index: 2;
    width: 20vw;
}
</style>

