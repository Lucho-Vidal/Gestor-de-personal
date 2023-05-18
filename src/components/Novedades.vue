<template>
    <div>
        <NavBar/>

        <main class="container">
            <h1 class="d-flex justify-content-center m-3">Novedades del Personal de Abordo</h1>
            <table
                class="table table-striped table-hover"
            >
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">legajo</th>
                        <th class="col-1" colspan="1">Apellido</th>
                        <th class="col-1" colspan="1">Nombres</th>
                        <th class="col-1" colspan="1">Turno</th>
                        <th class="col-1" colspan="1">Franco</th>
                        <th class="col-1" colspan="1">Especialidad</th>
                        <th class="col-1" colspan="1">Dotación</th>
                        <th class="col-1" colspan="1">Observaciones</th>
                        <th class="col-1" colspan="1">Orden</th>
                        <th class="col-1">Ver</th>
                        <th class="col-1">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(novedad, index) in novedades" :key="index" @dblclick="view()">
                        <td class="col-1">{{ novedad.legajo }}</td>
                        
                        <td class="col-1"><i class="fa-solid fa-folder-open" @click="view()"></i></td>
                        <td class="col-1"><i class="fa-solid fa-pen-to-square" @click="edit()"></i></td>
                        
                    </tr>
                </tbody>
            </table>
        </main>

        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import FooterPage from './FooterPage.vue'
import {Novedad} from '../interfaces/INovedades';
import { getNovedades } from '../services/novedadesService';

export default defineComponent({
    data(){
        return{
            novedades:[] as Novedad[],
        }
    },
    methods:{
        async loadNovedades(){
            const res = await getNovedades();
            this.novedades = res.data;
            console.log(this.novedades);
            
        },
        view(){
            console.log('hola desde view');
            
        },
        edit(){
            console.log('hola desde view');
            
        }
    },
    mounted() {
        this.loadNovedades();
    },
    name: "App",
    components: {
        NavBar,
        FooterPage
    },

});
</script>
<style>
main {
    min-height: 81.6vh;
}</style>
