<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Buscador de trenes
            </h1>
            <p class="d-flex justify-content-end m-2">
                Fecha: {{ today.toLocaleDateString() }}
            </p>
            <div class="">
                <input
                    type="text"
                    placeholder="Buscar Tren"
                    autofocus
                    v-model="tren"
                    v-on:change="buscar()"
                />
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr v-for="(ind, index) in itFiltrado" :key="index">
                        <th
                            v-for="i in ind.estaciones.length"
                            :key="i"
                            colspan="1"
                        >
                            {{ ind.estaciones[i - 1] }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ind, index) in itFiltrado" :key="index">
                        <td
                            v-for="i in ind.horarios.length"
                            :key="i"
                            class="w-10"
                        >
                            {{ ind.horarios[i - 1] }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped table-hover">
                <thead>
                    <tr v-if="indFiltrado.length != 0">
                        <th colspan="1">Ref</th>
                        <th colspan="1">Turno</th>
                        <th colspan="1">Observación</th>
                        <th colspan="2">Titular</th>
                        <th colspan="1">Toma</th>
                        <th colspan="1">Deja</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ind, index) in indFiltrado" :key="index">
                        <td class="w-10">{{ ind.refer }}</td>
                        <td class="w-10">{{ ind.turno }}</td>
                        <td class="w-10">{{ ind.observaciones }}</td>
                        <td colspan="2" class="w-10">Humana Daniel</td>
                        <td class="w-10">8:40</td>
                        <td class="w-10">14:40</td>
                    </tr>
                </tbody>
            </table>
            <table v-for="(turno, index) in turnos" :key="index" class="table table-striped table-hover">
                <thead>
                    <tr >
                        <th colspan="1">ID</th>
                        <th colspan="1">Ref</th>
                        <th colspan="1">Tren</th>
                        <th colspan="1">Origen</th>
                        <th colspan="1">Sale</th>
                        <th colspan="1">Destino</th>
                        <th colspan="1">Llega</th>
                        <th colspan="1">Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(vuelta, index) in turno" :key="index">
                        <td class="w-10">{{ vuelta.vuelta }}</td>
                        <td class="w-40">{{ vuelta.refer }}</td>
                        <td class="w-10">{{ vuelta.tren }}</td>
                        <td class="w-10">{{ vuelta.origen }}</td>
                        <td class="w-10">{{ vuelta.sale }}</td>
                        <td class="w-10">{{ vuelta.destino }}</td>
                        <td class="w-10">{{ vuelta.llega }}</td>
                        <td class="w-20">{{ vuelta.observaciones }}</td>
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
import { getIndice } from "../services/indicesService";
import { Indice } from "../interfaces/Indice";
import FooterPage from "./FooterPage.vue";
import { Itinerario } from "../interfaces/Itinerario";
import { getItinerario } from "../services/itinerarioService";

export default defineComponent({
    data() {
        return {
            tren: "" as string,
            indice: [] as Indice[],
            indFiltrado: [] as Indice[],
            turnos: [] as Array<Indice[]>,
            itinerario: [] as Itinerario[],
            itFiltrado: [] as Itinerario[],
            today: new Date(),
            lstTurnos: [] as Array<string[]>,
        };
    },
    methods: {
        async loadIndices() {
            const res = await getIndice();
            this.indice = res.data;
        },
        async loadItinerario() {
            const res = await getItinerario();
            this.itinerario = res.data;
        },
        buscar() {
            this.filtroTrenes();
            this.filtroItinerario();
        },
        filtroTrenes() {
            this.indFiltrado = this.indice.filter((ind: Indice) => {
                return ind.tren == parseInt(this.tren);
            });
        },
        filtroItinerario() {
            this.itFiltrado = this.itinerario.filter((horarios: Itinerario) => {
                return horarios.tren == parseInt(this.tren);
            });
            this.filtroTurno();
        },
        filtroTurno() {
            this.turnos = []
            this.indFiltrado.forEach((turno: Indice) => {
                this.turnos.push(
                    this.indice.filter((ind: Indice) => {
                        return ind.turno == turno.turno;
                    })
                );                
            });            
        },
    },
    mounted() {
        this.loadIndices();
        this.loadItinerario();
    },
    computed: {},
    components: {
        NavBar,
        FooterPage,
    },
});
</script>
<style>
/* main {
    height: 86.7vh;
} */
</style>
