<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Buscador de trenes
            </h1>
            <p class="d-flex justify-content-end m-2">Fecha: {{ today.toLocaleDateString() }}</p>
            <div class="">
                <input type="text" placeholder="Tren" v-model="tren"/>
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
                    <tr>
                        <td class="w-10">Titular</td>
                        <td class="w-10">519</td>
                        <td class="w-10">R/O 504.1</td>
                        <td colspan="2" class="w-10">Humana Daniel</td>
                        <td class="w-10">8:40</td>
                        <td class="w-10">14:40</td>
                    </tr>
                    <tr>
                        <td class="w-10">Titular</td>
                        <td class="w-10">750</td>
                        <td class="w-10"></td>
                        <td colspan="2" class="w-10">Correa Pedro</td>
                        <td class="w-10">9:00</td>
                        <td class="w-10">15:00</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";

export default defineComponent({
    data() {
        return {
            tren: "",
            today: new Date(),
        };
    },
    methods: {},
    computed: {},
    components: {
        NavBar,
    },
});
</script>
