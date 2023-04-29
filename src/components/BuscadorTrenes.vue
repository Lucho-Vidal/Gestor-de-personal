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
                <p>Tren: {{ tren }}</p>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th colspan="1">PC</th>
                        <th colspan="1">ALL</th>
                        <th colspan="1">RE</th>
                        <th colspan="1">TY</th>
                        <th colspan="1">LLV</th>
                        <th colspan="1">MG</th>
                        <th colspan="1">ZZ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="w-10">4:23</td>
                        <td class="w-10">4:31</td>
                        <td class="w-10">4:40</td>
                        <td class="w-10">4:52</td>
                        <td class="w-10">4:59</td>
                        <td class="w-10">5:06</td>
                        <td class="w-10">5:15</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
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
            itinerario: [] as Itinerario[],
            itFiltrado: [] as Itinerario[],
            today: new Date(),
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
                //https://dev.to/duxtech/5-maneras-de-iterar-un-objeto-en-javascript-jkn
                //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/delete
            });
        },
        filtroItinerario() {
            console.log("DEBUG2", this.itinerario);
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
main {
    height: 86.7vh;
}
</style>
