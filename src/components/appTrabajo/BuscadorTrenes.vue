<template>
    <div>
        <NavBar @update:isAsideBarVisible="handleAsideBarVisibility" />
        <asideBar  v-if="isAsideBarVisible"/>
        <div
            id="layoutSidenav_content"
            class="body"
            :class="[
                isAsideBarVisible
                    ? 'layoutSidenav_content-width-max'
                    : 'layoutSidenav_content-width-min',
            ]"
        >
            <main>
                <div class="container-fluid px-4">
                    <h2 class="d-flex justify-content-center m-3">
                        Buscador de trenes
                    </h2>
                    <div class="d-flex row">
                        <div class="row justify-content-end">
                            <!-- <p class="col">
                            Fecha: {{ days[today.getDay()] }}
                            {{ today.toLocaleDateString() }}
                        </p> -->
                        </div>
                        <div class="row justify-content-between">
                            <input
                                class="col-3"
                                type="text"
                                placeholder="Buscar por tren o por turno"
                                autofocus
                                v-model="tren"
                                v-on:change="buscar()"
                            />
                            <select
                                name="itinerario"
                                id="itinerario"
                                class="col-2"
                                required
                                v-model="inputIt"
                                v-on:change="buscar()"
                            >
                                <option value=""></option>
                                <option value="H">Hábil</option>
                                <option value="S">Sábado</option>
                                <option value="D">Domingo</option>
                            </select>
                            <input
                                class="col-3"
                                type="date"
                                v-model="inputDate"
                                v-on:change="buscar()"
                            />
                        </div>

                        <div class="d-flex flex-wrap my-3">
                            <h6>Aplicar circular:</h6>
                            <div
                                v-for="(circular, index) in circulares"
                                :key="index"
                            >
                                <label class="form-check-label mx-2">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        :value="circular"
                                        v-model="circularSeleccionada"
                                        v-on:change="cambioCirculares()"
                                    />
                                    {{ circular }}
                                    <!-- Mostrar el valor de la variable circular en el label -->
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class=""></div>
                    <table class="table table-striped table-hover">
                        <thead v-if="horarios !== null">
                            <tr v-if="horarios.estaciones !== undefined">
                                <th
                                    v-for="i in horarios.estaciones.length"
                                    :key="i"
                                    colspan="1"
                                >
                                    {{ horarios.estaciones[i - 1] }}
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="horarios !== null">
                            <tr v-if="horarios.horarios !== undefined">
                                <th
                                    v-for="i in horarios.horarios.length"
                                    :key="i"
                                    colspan="1"
                                >
                                    {{ horarios.horarios[i - 1] }}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <table
                        v-if="turnosAImprimir !== null"
                        class="table table-striped table-hover"
                    >
                        <thead>
                            <tr v-if="turnosAImprimir.length != 0">
                                <th colspan="1">Ref</th>
                                <th colspan="1">Turno</th>
                                <th colspan="1">Circular</th>
                                <th colspan="1">Observación</th>
                                <th colspan="2">Titular</th>
                                <th colspan="1">Toma</th>
                                <th colspan="1">Deja</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(ind, index) in turnosAImprimir"
                                :key="index"
                            >
                                <td class="w-10">{{ ind.vueltas[0].refer }}</td>
                                <td class="w-10">{{ ind.turno }}</td>
                                <td class="w-10">{{ ind.circular }}</td>
                                <td class="w-10">
                                    {{ ind.vueltas[0].observaciones }}
                                </td>
                                <td colspan="2" class="w-10">
                                    {{ ind.especialidad+ ': ' +  ind.personal }}
                                </td>
                                <td class="w-10">{{ ind.toma }}</td>
                                <td class="w-10">{{ ind.deja }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div
                        v-for="(t, tIndex) in turnosAImprimir"
                        :key="tIndex"
                        class="row"
                    >
                        <h4 class="Personal col-1">{{ t.turno }}</h4>
                        <h4 class="col-4">{{ t.personal }}</h4>
                        <h5 class="col-2">{{ "<<" + t.circular + ">>" }}</h5>
                        <h5 class="col-2">Toma: {{ t.toma }}</h5>
                        <h5 class="col-2">Deja: {{ t.deja }}</h5>
                        <table class="table table-striped table-hover">
                            <thead class="">
                                <tr>
                                    <th colspan="1">Vuelta</th>
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
                                <tr
                                    v-for="(vuelta, index) in t.vueltas"
                                    :key="index"
                                >
                                    <td class="col-3">{{ vuelta.vuelta }}</td>
                                    <td class="col-1">{{ vuelta.refer }}</td>
                                    <td class="col-1">{{ vuelta.tren }}</td>
                                    <td class="col-1">{{ vuelta.origen }}</td>
                                    <td class="col-1">{{ vuelta.sale }}</td>
                                    <td class="col-1">{{ vuelta.destino }}</td>
                                    <td class="col-1">{{ vuelta.llega }}</td>
                                    <td class="col-3">
                                        {{ vuelta.observaciones }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <footer-page />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "../NavBar.vue";
import asideBar from "../asideBar.vue";
import FooterPage from "../FooterPage.vue";
import { AxiosError } from "axios";
import { ITurno } from "../../interfaces/ITurno";
import { getTurnos } from "../../services/turnosService";
import { Itinerario } from "../../interfaces/Itinerario";
import { IPersonal } from "../../interfaces/IPersonal";
import { Novedad } from "../../interfaces/INovedades";
import { newToken } from "../../services/signService";
import { CambioTurno } from '../../interfaces/ICambioTurno';
import { buscarPersonalACargo, filtrarPorTurno, filtroTrenes, filtroItinerario, obtenerTiposCirculares, handleRequestError, loadItinerario, loadCambiosTurnos, loadPersonales, loadNovedades } from '../../utils/funciones';

export default defineComponent({
    data() {
        return {
            tren: "" as string,
            turno: [] as ITurno[],
            circulares: [] as string[],
            circularSeleccionada: ["Dic23"] as string[],
            turnosAImprimir: [] as ITurno[] | null,
            itinerario: [] as Itinerario[],
            horarios: {} as Itinerario | null,
            personales: [] as IPersonal[],
            today: new Date(),
            novedades: [] as Novedad[],
            inputDate: "" as string,
            inputIt: "" as string,
            days: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ],
            cambiosTurnos: [] as  CambioTurno[],
        };
    },
    setup() {
        const isAsideBarVisible = ref(false); // Estado inicial visible
        function toggleAsideBar() {
            isAsideBarVisible.value = !isAsideBarVisible.value; // Cambia el estado de isAsideBarVisible
        }

        return { isAsideBarVisible, toggleAsideBar };
    },
    methods: {
        async loadTurnos() {
            /* Trae todos los elementos de la base de datos  */
            try {
                const res = await getTurnos();
                this.turno = res.data;
                const circularSeleccionadaString = window.localStorage.getItem(
                    "circularSeleccionada"
                );
                this.circularSeleccionada = circularSeleccionadaString
                    ? circularSeleccionadaString.split(",")
                    : [];
                this.circulares = obtenerTiposCirculares(this.turno);
            } catch (error) {
                handleRequestError(error as AxiosError);
            }
        },

        buscar() {
            /* Ejecuta en cada búsqueda todos los métodos necesarios. 
            Se ejecuta por v-on:change en el input  */
            //limpio variables globales
            this.horarios = null;
            this.turnosAImprimir = null;

            const fecha: Date = this.obtenerFecha(this.inputDate, this.today);
            const itinerario: string = this.itinerarioType(fecha);

            if (this.tren !== "") {
                //si no se encuentra tren no continuo con la búsqueda
                this.turnosAImprimir = filtroTrenes(
                    itinerario,
                    this.turno,
                    this.circularSeleccionada,
                    parseInt(this.tren)
                );
                if (this.turnosAImprimir.length > 0) {
                    this.horarios = filtroItinerario(
                        itinerario,
                        this.itinerario,
                        parseInt(this.tren)
                    );
                    //this.turnosAImprimir = this.filtroTurno(itinerario);
                    buscarPersonalACargo(
                        fecha,
                        this.inputDate,
                        this.turnosAImprimir,
                        this.personales,
                        this.novedades,
                        this.cambiosTurnos
                    );
                } else {
                    this.turnosAImprimir = filtrarPorTurno(
                        itinerario,
                        this.turno,
                        this.circularSeleccionada,
                        this.tren
                    );
                    //this.filtroTurno(itinerario);
                    buscarPersonalACargo(
                        fecha,
                        this.inputDate,
                        this.turnosAImprimir,
                        this.personales,
                        this.novedades,
                        this.cambiosTurnos
                    );
                }
            }
        },
        obtenerFecha(fecha: string, today: Date) {
            if (fecha == "") {
                // Formatear la fecha en formato ISO (YYYY-MM-DD)
                const formattedDate = today.toISOString().split("T")[0];
                // Asignar el valor al input
                this.inputDate = formattedDate;
                return today;
            } else {
                return new Date(fecha + " 12:00");
            }
        },
        itinerarioType(fecha: Date) {
            if (this.inputIt === "") {
                if (fecha.getDay() === 0) {
                    this.inputIt = "D";
                    return "D";
                } else if (fecha.getDay() === 6) {
                    this.inputIt = "S";
                    return "S";
                } else {
                    this.inputIt = "H";
                    return "H";
                }
            } else {
                return this.inputIt;
            }
        },
        cambioCirculares() {
            window.localStorage.setItem(
                "circularSeleccionada",
                this.circularSeleccionada.join(",")
            );

            this.buscar();
        },
        handleAsideBarVisibility(isVisible: boolean) {
            this.isAsideBarVisible = isVisible;
        },
    },
    async mounted() {
        try {
            this.loadTurnos();
            this.itinerario = await loadItinerario() || [];
            this.cambiosTurnos = await loadCambiosTurnos() || [];
            this.personales = await loadPersonales() || [];
            this.novedades = await loadNovedades() || [];
            this.today.setHours(12, 0, 0, 0);
            newToken();
        } catch (error) {
            console.error(error);
        }
    },
    computed: {},
    components: {
        NavBar,
        asideBar,
        FooterPage,
    },
});
</script>
<style>
main {
    margin-top: 5rem;
}
body {
    background: #ddd;
}
.Personal {
    background: #000;
    width: 150px;
    border-top: #000;
    color: #ddd;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    border-radius: 0.5rem;
}
</style>
