<template>
    <div>
        <NavBar />

        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Novedades del Personal de Abordo
            </h1>
            <div class="d-flex">
                <a class="btn btn-primary d-flex end" href="/newNovedades"
                    >Nueva Novedad</a
                >
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">Num</th>
                        <th class="col-1" colspan="1">Legajo</th>
                        <th class="col-1" colspan="1">Apellido</th>
                        <th class="col-1" colspan="1">Nombres</th>
                        <th class="col-1" colspan="1">Base</th>
                        <th class="col-1" colspan="1">Novedad</th>
                        <th class="col-1" colspan="1">Fecha de Baja</th>
                        <th class="col-1" colspan="1">Fecha de Alta</th>
                        <th class="col-1">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(novedad, index) in novedades"
                        :key="index"
                        @dblclick="edit(novedad._id)"
                    >
                        <td class="col-1">{{ novedad._id }}</td>
                        <td class="col-1">{{ novedad.legajo }}</td>
                        <td class="col-1">{{ novedad.apellido }}</td>
                        <td class="col-1">{{ novedad.nombres }}</td>
                        <td class="col-1">{{ novedad.base }}</td>
                        <td class="col-1">{{ novedad.tipoNovedad }}</td>
                        <td class="col-1">{{ novedad.fechaBaja }}</td>
                        <td class="col-1">{{ novedad.fechaAlta }}</td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-pen-to-square"
                                @click="edit(novedad._id)"
                            ></i>
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
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { Novedad } from "../../interfaces/INovedades";
import { getNovedades } from "../../services/novedadesService";

export default defineComponent({
    data() {
        return {
            novedades: [] as Novedad[],
        };
    },
    methods: {
        async loadNovedades() {
            const res = await getNovedades();
            this.novedades = res.data;
        },
        edit(id:number){
            this.$router.push( `/editNovedades/${id}`)
        }
    },
    mounted() {
        this.loadNovedades();
    },
    name: "App",
    components: {
        NavBar,
        FooterPage,
    },
});
</script>
<style>
main {
    min-height: 81.6vh;
}
</style>
