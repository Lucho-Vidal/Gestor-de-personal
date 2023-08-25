<template>
    <main>
        <NavBar />
        <div class="container">
            <h1 class="d-flex justify-content-center m-3">
                Listado Personal de Abordo
            </h1>
            <p class="d-flex justify-content-end m-2">
                Fecha: {{ days[today.getDay()] }}
                {{ today.toLocaleDateString() }}
            </p>
            <div class="form-check">
                <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                    Default checkbox
                </label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault2"
                />
                <label class="form-check-label" for="flexCheckDefault2">
                    Default checkbox
                </label>
            </div>
            <table class="table table-striped table-hover">
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
                        <th class="col-1">Ver</th>
                        <th class="col-1">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(personal, index) in personales"
                        :key="index"
                        @dblclick="view()"
                    >
                        <td class="col-1">{{ personal.legajo }}</td>
                        <td class="col-1">{{ personal.apellido }}</td>
                        <td class="col-2">{{ personal.nombres }}</td>
                        <td class="col-1">{{ personal.turno }}</td>
                        <td class="col-1">{{ days[personal.franco] }}</td>
                        <td class="col-1">{{ personal.especialidad }}</td>
                        <td class="col-1">{{ personal.dotacion }}</td>
                        <td class="col-2">{{ personal.observaciones }}</td>
                        <td class="col-1">{{ personal.orden }}</td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-folder-open"
                                @click="view()"
                            ></i>
                        </td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-pen-to-square"
                                @click="edit()"
                            ></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <FooterPage />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import FooterPage from "./FooterPage.vue";
import { getPersonales } from "../services/personalService";
import { IPersonal } from "../interfaces/IPersonal";

export default defineComponent({
    data() {
        return {
            personales: [] as IPersonal[],
            today: new Date(),
            days: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ],
        };
    },
    methods: {
        async loadPersonales() {
            const res = await getPersonales();
            this.personales = res.data;
        },
        view() {
            console.log("hola desde view");
        },
        edit() {
            console.log("hola desde Edit");
        },
    },
    mounted() {
        this.loadPersonales();
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
