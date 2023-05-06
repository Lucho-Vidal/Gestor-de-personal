<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Buscador de trenes
            </h1>
            <p class="d-flex justify-content-end m-2">
                Fecha: {{ days[today.getDay()] }} {{ today.toLocaleDateString() }}
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
                        <td class="w-10">{{ ind.diagrama.refer }}</td>
                        <td class="w-10">{{ ind.turno }}</td>
                        <td class="w-10">{{ ind.diagrama.observaciones }}</td>
                        <td colspan="2" class="w-10">{{ ind.personal }}</td>
                        <td class="w-10">{{ ind.toma }}</td>
                        <td class="w-10">{{ ind.deja }}</td>
                    </tr>
                </tbody>
            </table>
            <table
                v-for="(turno, index) in turnos"
                :key="index"
                class="table table-striped table-hover"
            >
                <thead>
                    <h4>{{ turno[0].turno }} - {{ turno[0].personal }}</h4>
                    <tr>
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
                        <td class="w-10">{{ vuelta.diagrama.vuelta }}</td>
                        <td class="w-40">{{ vuelta.diagrama.refer }}</td>
                        <td class="w-10">{{ vuelta.diagrama.tren }}</td>
                        <td class="w-10">{{ vuelta.diagrama.origen }}</td>
                        <td class="w-10">{{ vuelta.diagrama.sale }}</td>
                        <td class="w-10">{{ vuelta.diagrama.destino }}</td>
                        <td class="w-10">{{ vuelta.diagrama.llega }}</td>
                        <td class="w-20">
                            {{ vuelta.diagrama.observaciones }}
                        </td>
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
            days: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
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
                return ind.diagrama.tren == parseInt(this.tren);
            });
            console.log(this.indFiltrado);
        },
        filtroItinerario() {
            this.itFiltrado = this.itinerario.filter((horarios: Itinerario) => {
                return horarios.tren == parseInt(this.tren);
            });
            this.filtroTurno();
        },
        filtroTurno() {
            this.turnos = [];
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
table h4 {
    background: #000;
    color: #fff;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    border-radius: 1rem;
}

</style>
