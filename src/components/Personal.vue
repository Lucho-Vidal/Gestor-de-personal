<template>
    <div>
        <NavBar />
        <div class="container">
            <h1 class="d-flex justify-content-center m-3">Personal</h1>
            <p class="d-flex justify-content-end m-2">
                Fecha: {{ days[today.getDay()] }} {{ today.toLocaleDateString() }}
            </p>
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
                        <th class="col-1" colspan="1">Dotacion</th>
                        <th class="col-1" colspan="1">Observaciones</th>
                        <th class="col-1" colspan="1">Orden</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(personal, index) in conductores" :key="index">
                        <td class="w-5">{{ personal.legajo }}</td>
                        <td class="w-10">{{ personal.apellido }}</td>
                        <td class="w-10">{{ personal.nombres }}</td>
                        <td class="w-10">{{ personal.turno }}</td>
                        <td class="w-10">{{ days[personal.franco] }}</td>
                        <td class="w-10">{{ personal.especialidad }}</td>
                        <td class="w-10">{{ personal.dotacion }}</td>
                        <td class="w-10">{{ personal.observaciones }}</td>
                        <td class="w-10">{{ personal.orden }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <FooterPage />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import FooterPage from "./FooterPage.vue";
import { getConductor, getGuarda } from '../services/personalService';
import { IConductor } from "../interfaces/IConductores";
import { IGuarda } from '../interfaces/IGuarda';


export default defineComponent({
    data(){
        return{
            conductores:[] as IConductor[],
            guardas:[] as IGuarda[],
            today: new Date(),
            days: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
        }
    },
    methods:{
        async loadConductores(){
            const res = await getConductor();
            this.conductores = res.data;
            console.log("DEBUG1",this.conductores);
            
        },
        async loadGuardas(){
            const res = await getGuarda();
            this.guardas = res.data;
        }
    },
    mounted(){
        this.loadConductores();
        this.loadGuardas();
        console.log(this.conductores);
        
    },
    name: "App",
    components: {
        NavBar,
        FooterPage,
    },
});
</script>
<style>

</style>
