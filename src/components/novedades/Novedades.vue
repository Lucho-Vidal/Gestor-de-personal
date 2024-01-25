<template>
    <div>
        <NavBar />

        <main class="container">
            <h2 class="d-flex justify-content-center m-3">
                Novedades del Personal de Abordo
            </h2>
            <div class="d-flex">
                <a class="btn btn-primary d-flex end" href="/newNovedades"
                    >Nueva Novedad</a
                >
            </div>

            <details>
                <summary>Filtros:</summary>
                <div class="my-3">
                    <h6>Filtrar por HNA:</h6>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="HNA"
                            v-model="checkboxHna"
                            @change="filtrar()"
                        />
                        HNA
                    </label>
                </div>
                <div class="my-3">
                    <h6>Filtrar descubiertos:</h6>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="descubierto"
                            v-model="checkboxDescubierto"
                            @change="filtrar()"
                        />
                        Sin Cubrir
                    </label>
                </div>
            </details>
            <h3 v-if="novedadesFiltradas.length == 0">
                No se encontró ninguna novedad con los requerimientos
                especificados.
            </h3>

            <table
                v-if="novedadesFiltradas.length > 0"
                class="table table-striped table-hover"
            >
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">Num</th>
                        <th class="col-1" colspan="1">Legajo</th>
                        <th class="col-1" colspan="1">Apellido</th>
                        <th class="col-1" colspan="1">Nombres</th>
                        <th class="col-1" colspan="1">Base</th>
                        <th class="col-1" colspan="1">Turno</th>
                        <th class="col-1" colspan="1">Franco</th>
                        <th class="col-1" colspan="1">Novedad</th>
                        <th class="col-1" colspan="1">Fecha de Baja</th>
                        <th class="col-1" colspan="1">Fecha de Alta</th>
                        <th class="col-1">Ver</th>
                        <th class="col-1">Borrar</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(novedad, index) in novedadesFiltradas"
                    :key="index"
                    @dblclick="edit(novedad._id)"
                    @click="viewDetail(novedad)"
                >
                    <tr class="Small shadow">
                        <td class="col-1">{{ novedad._id }}</td>
                        <td class="col-1">{{ novedad.legajo }}</td>
                        <td class="col-1">{{ novedad.apellido }}</td>
                        <td class="col-2">{{ novedad.nombres }}</td>
                        <td class="col-1">{{ novedad.base }}</td>
                        <td class="col-1">
                            {{ novedad.turno + " / " + dia_laboral(obtenerNumeroDia(novedad.franco),today.getDay()) }}
                        </td>
                        <td class="col-1">{{ novedad.franco }}</td>
                        <td class="col-1">{{ novedad.tipoNovedad }}</td>
                        <td class="col-1">
                            {{
                                new Date(
                                    novedad.fechaBaja + " 12:00"
                                ).toLocaleDateString()
                            }}
                        </td>
                        <td class="col-1">
                            {{
                                !novedad.HNA
                                    ? new Date(
                                        novedad.fechaAlta + " 12:00"
                                    ).toLocaleDateString()
                                    : ""
                            }}
                        </td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-pen-to-square"
                                @click="edit(novedad._id)"
                            ></i>
                        </td>
                        <td class="col-1">
                            <i class="fa-solid fa-trash-can"
                                @click="deleteNovedad(novedad._id,index)"
                            ></i>
                        </td>
                    </tr>
                    <tr v-if="novedad.viewDetail">
                        <td colspan="12">
                            <div class="row" v-if="novedad.remplazo[0]">
                                <h6 class="col-1">Releva:</h6>
                                <p class="col-3">
                                    {{
                                        novedad.remplazo[
                                            novedad.remplazo.length - 1
                                        ].apellido +
                                        " " +
                                        novedad.remplazo[
                                            novedad.remplazo.length - 1
                                        ].nombres
                                    }}
                                </p>
                                <h6 class="col-1">Desde:</h6>
                                <p class="col-1">
                                    {{
                                        novedad.remplazo[
                                            novedad.remplazo.length - 1
                                        ].inicioRelevo
                                    }}
                                </p>
                                <h6 class="col-1">Hasta:</h6>
                                <p class="col-1">
                                    {{
                                        novedad.remplazo[
                                            novedad.remplazo.length - 1
                                        ].finRelevo
                                    }}
                                </p>
                            </div>
                            <div v-else>
                                <h6>Sin Relevo</h6>
                            </div>
                            <div v-if="novedad.detalle">
                                <h6>Detalle:</h6>
                                <p>{{ novedad.detalle }}</p>
                            </div>
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
import { getNovedades, deleteNovedad } from "../../services/novedadesService";
import { newToken } from "../../services/signService";

export default defineComponent({
    data() {
        return {
            novedades: [] as Novedad[],
            novedadesFiltradas: [] as Novedad[],
            checkboxHna: false,
            checkboxDescubierto: false,
            username: "" as string,
            today: new Date()
        };
    },
    methods: {
        async loadNovedades() {
            const res = await getNovedades();
            this.novedades = res.data;
            this.filtrar();
        },
        edit(id: number) {
            this.$router.push(`/editNovedades/${id}`);
        },
        viewDetail(novedad: Novedad) {
            if (novedad.viewDetail) {
                novedad.viewDetail = false;
            } else {
                novedad.viewDetail = true;
            }
        },
        obtenerNumeroDia(dia: string) {
            const diasDeLaSemana = [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ];

            // Obtén el índice del día en el array
            const indice = diasDeLaSemana.findIndex((nombre) => nombre === dia);

            // Si se encuentra, devuelve el índice (0-6); de lo contrario, devuelve -1
            return indice;
        },
        dia_laboral(diaLaboral: number, hoy: number) {
            /*   # devuelve el día de la semana como un número entero donde el Domingo
            está indexado como 0 y el Sábado como 6
            Al ingresarle por parámetros la cantidad de días del turno pos franco y
            el dia de la semana actual devuelve el dia del franco del turno mismo. */
            if(diaLaboral === -1){
                return "S/F"
            }else{
                const diagrama = [
                    [0, 1, 2, 3, 4, 5, 6],
                    [6, 0, 1, 2, 3, 4, 5],
                    [5, 6, 0, 1, 2, 3, 4],
                    [4, 5, 6, 0, 1, 2, 3],
                    [3, 4, 5, 6, 0, 1, 2],
                    [2, 3, 4, 5, 6, 0, 1],
                    [1, 2, 3, 4, 5, 6, 0],
                ];
                return diagrama[diaLaboral][hoy]; //:franco
            }
        },
        async deleteNovedad(id:number,index:number){
            const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta novedad?");
            if(confirmacion){
                await deleteNovedad(id);
                this.novedadesFiltradas.splice(index,1);
            }
            
        },
        filtrar() {
            if (this.checkboxHna && this.checkboxDescubierto) {
                this.novedadesFiltradas = this.novedades.filter(
                    (novedad: Novedad) => {
                        return (
                            (novedad.HNA && novedad.remplazo.length == 0) ||
                            novedad.remplazo[novedad.remplazo.length - 1]
                                .finRelevo
                        );
                    }
                );
            } else if (this.checkboxDescubierto) {
                this.novedadesFiltradas = this.novedades.filter(
                    (novedad: Novedad) => {
                        return novedad.remplazo.length == 0;
                    }
                );
            } else if (this.checkboxHna) {
                this.novedadesFiltradas = this.novedades.filter(
                    (novedad: Novedad) => {
                        return novedad.HNA;
                    }
                );
            } else {
                this.novedadesFiltradas = this.novedades;
            }
        },
    },
    created() {
        this.loadNovedades();
        newToken();
        this.username = localStorage.getItem("username") || "";
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

.hidden-row {
    display: none;
}
</style>
