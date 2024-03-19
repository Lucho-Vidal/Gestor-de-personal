<template>
    <div id="sb-nav-fixed">
        <NavBar @update:isAsideBarVisible="handleAsideBarVisibility" />
        <asideBar />
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
                        Lista de personales
                    </h2>
                    <div class="d-flex mb-3">
                        <label for="dotacion" class="col-2 mx-3">
                            Dotacion
                            <select
                                name="dotacion"
                                id="dotacion"
                                class="col-6 mx-3"
                                v-model="checkboxDotacion"
                                @change="filtrar()"
                            >
                                <option value="PC">PC</option>
                                <option value="LLV">LLV</option>
                                <option value="TY">TY</option>
                                <option value="LP">LP</option>
                                <option value="K5">K5</option>
                                <option value="RE">RE</option>
                                <option value="CÑ">CÑ</option>
                                <option value="AK">AK</option>
                            </select>
                        </label>

                        <label for="it" class="col-2 mx-3">
                            Itinerario
                            <select
                                name="it"
                                id="it"
                                class="col-6 mx-3"
                                v-model="checkboxIt"
                                @change="filtrar()"
                            >
                                <option value="H">Hábil</option>
                                <option value="S">Sábado</option>
                                <option value="D">Domingo</option>
                            </select>
                        </label>

                        <input
                            type="date"
                            name="today"
                            id="today"
                            v-model="inputDate"
                            @change="filtrar()"
                        />
                    </div>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6">
                                <ul class="list-unstyled">
                                    <li>
                                        <h4>Conductores</h4>
                                    </li>
                                    <table
                                        class="table table-striped table-hover"
                                    >
                                        <thead>
                                            <tr>
                                                <th class="col-1" colspan="1">
                                                    Turno
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Toma
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Deja
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    ref
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Tren
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Sale
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Circular
                                                </th>
                                                <th class="col-6" colspan="1">
                                                    Personal
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody
                                            v-for="(
                                                turno, index
                                            ) in turnosConductor"
                                            :key="index"
                                            class="Small"
                                            @dblclick="viewDetail(turno)"
                                        >
                                            <tr
                                                :class="{'fila-oscura':turno.personal =='Sin Cubrir'}"
                                            >
                                                <td class="col-1">
                                                    {{ turno.turno }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.toma }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.deja }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].refer }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].tren }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].sale }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.circular }}
                                                </td>
                                                <td class="col-6">
                                                    {{ turno.personal }}
                                                </td>
                                            </tr>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Vuelta
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Referencia
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Tren
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Origen
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Sale
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Destino
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Llega
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Observaciones
                                            </th>
                                            <tr
                                                style="margin-bottom: 10px"
                                                v-for="(
                                                    vuelta, index
                                                ) in turno.vueltas"
                                                :key="index"
                                            >
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.vuelta }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.refer }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.tren }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.origen }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.sale }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.destino }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.llega }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.observaciones }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <li>Ordenes</li>
                                    <table
                                        class="table table-striped table-hover"
                                    >
                                        <thead>
                                            <tr>
                                                <th class="col-1" colspan="1">
                                                    Turno
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Toma
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Deja
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    ref
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Tren
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Sale
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Circular
                                                </th>
                                                <th class="col-6" colspan="1">
                                                    Personal
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody
                                            v-for="(
                                                turno, index
                                            ) in turnosConductorOrd"
                                            :key="index"
                                            class="Small"
                                            @dblclick="viewDetail(turno)"
                                        >
                                            <tr
                                                :class="{
                                                    'fila-oscura':
                                                        turno.personal ==
                                                        'Sin Cubrir',
                                                }"
                                            >
                                                <td class="col-1">
                                                    {{ turno.turno }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.toma }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.deja }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].refer }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].tren }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].sale }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.circular }}
                                                </td>
                                                <td class="col-6">
                                                    {{ turno.personal }}
                                                </td>
                                            </tr>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Vuelta
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Referencia
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Tren
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Origen
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Sale
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Destino
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Llega
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Observaciones
                                            </th>
                                            <tr
                                                style="margin-bottom: 10px"
                                                v-for="(
                                                    vuelta, index
                                                ) in turno.vueltas"
                                                :key="index"
                                            >
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.vuelta }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.refer }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.tren }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.origen }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.sale }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.destino }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.llega }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.observaciones }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul class="list-unstyled">
                                    <li>
                                        <h4>Guarda tren</h4>
                                    </li>
                                    <table
                                        class="table table-striped table-hover"
                                    >
                                        <thead>
                                            <tr>
                                                <th class="col-1" colspan="1">
                                                    Turno
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Toma
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Deja
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    ref
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Tren
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Sale
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Circular
                                                </th>
                                                <th class="col-6" colspan="1">
                                                    Personal
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody
                                            v-for="(
                                                turno, index
                                            ) in turnosGuardas"
                                            :key="index"
                                            class="Small"
                                            @dblclick="viewDetail(turno)"
                                        >
                                            <tr
                                                :class="{
                                                    'fila-oscura':
                                                        turno.personal ==
                                                        'Sin Cubrir',
                                                }"
                                            >
                                                <td class="col-1">
                                                    {{ turno.turno }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.toma }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.deja }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].refer }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].tren }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].sale }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.circular }}
                                                </td>
                                                <td class="col-6">
                                                    {{ turno.personal }}
                                                </td>
                                            </tr>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Vuelta
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Referencia
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Tren
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Origen
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Sale
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Destino
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Llega
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Observaciones
                                            </th>
                                            <tr
                                                style="margin-bottom: 10px"
                                                v-for="(
                                                    vuelta, index
                                                ) in turno.vueltas"
                                                :key="index"
                                            >
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.vuelta }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.refer }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.tren }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.origen }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.sale }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.destino }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.llega }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.observaciones }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <li>Ordenes</li>
                                    <table
                                        class="table table-striped table-hover"
                                    >
                                        <thead>
                                            <tr>
                                                <th class="col-1" colspan="1">
                                                    Turno
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Toma
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Deja
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    ref
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Tren
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Sale
                                                </th>
                                                <th class="col-1" colspan="1">
                                                    Circular
                                                </th>
                                                <th class="col-6" colspan="1">
                                                    Personal
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody
                                            v-for="(
                                                turno, index
                                            ) in turnosGuardasOrd"
                                            :key="index"
                                            class="Small"
                                            @dblclick="viewDetail(turno)"
                                        >
                                            <tr
                                                :class="{
                                                    'fila-oscura':
                                                        turno.personal ==
                                                        'Sin Cubrir',
                                                }"
                                            >
                                                <td class="col-1">
                                                    {{ turno.turno }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.toma }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.deja }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].refer }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].tren }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.vueltas[0].sale }}
                                                </td>
                                                <td class="col-1">
                                                    {{ turno.circular }}
                                                </td>
                                                <td class="col-6">
                                                    {{ turno.personal }}
                                                </td>
                                            </tr>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Vuelta
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Referencia
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Tren
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Origen
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Sale
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Destino
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Llega
                                            </th>
                                            <th
                                                class="col-1"
                                                colspan="1"
                                                v-if="turno.viewDetail"
                                            >
                                                Observaciones
                                            </th>
                                            <tr
                                                style="margin-bottom: 10px"
                                                v-for="(
                                                    vuelta, index
                                                ) in turno.vueltas"
                                                :key="index"
                                            >
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.vuelta }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.refer }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.tren }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.origen }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.sale }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.destino }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.llega }}
                                                </td>
                                                <td
                                                    colspan="1"
                                                    v-if="turno.viewDetail"
                                                >
                                                    {{ vuelta.observaciones }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FooterPage />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref , onBeforeMount } from "vue";
import NavBar from "../NavBar.vue";
import asideBar from "../asideBar.vue";
import FooterPage from "../FooterPage.vue";
import { newToken } from "../../services/signService";
import { IPersonal } from "../../interfaces/IPersonal";
import { getTurnos } from "../../services/turnosService";
import { ITurno } from "../../interfaces/ITurno";
import { AxiosError } from "axios";
import { getNovedades } from "../../services/novedadesService";
import { getPersonales } from "../../services/personalService";
import { Novedad, Remplazo } from "../../interfaces/INovedades";

export default defineComponent({
    data() {
        return {
            personales: [] as IPersonal[],
            turnos: [] as ITurno[],
            novedades: [] as Novedad[],
            today: new Date(),
            checkboxDotacion: "" as string,
            turnosConductor: [] as ITurno[],
            turnosGuardas: [] as ITurno[],
            turnosConductorOrd: [] as ITurno[],
            turnosGuardasOrd: [] as ITurno[],
            checkboxIt: "" as string,
            inputDate: "" as string,
            circulares: [] as string[],
            circularSeleccionada: ["Dic23"] as string[],
            datosCargados: 0 as number,
        };
    },
    setup() {
        const isAsideBarVisible = ref(true); // Estado inicial visible
        function toggleAsideBar() {
            isAsideBarVisible.value = !isAsideBarVisible.value; // Cambia el estado de isAsideBarVisible
        }
        onBeforeMount(() => {
            isAsideBarVisible.value = localStorage.getItem('sb|sidebar-toggle') === 'true';
        });

        return {isAsideBarVisible,toggleAsideBar};
    },
    methods: {
        async loadTurnos() {
            /* Trae todos los elementos de la base de datos  */
            try {
                const res = await getTurnos();
                this.turnos = res.data;
                const circularSeleccionadaString = window.localStorage.getItem(
                    "circularSeleccionada"
                );
                this.circularSeleccionada = circularSeleccionadaString
                    ? circularSeleccionadaString.split(",")
                    : [];
                this.circulares = this.obtenerTiposCirculares(this.turnos);
                if (this.datosCargados > 1) {
                    this.filtrar();
                } else {
                    this.datosCargados++;
                }
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        async loadPersonales() {
            try {
                /* Trae todos los elementos de la base de datos */
                const res = await getPersonales();
                this.personales = res.data;
                if (this.datosCargados > 1) {
                    this.filtrar();
                } else {
                    this.datosCargados++;
                }
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        async loadNovedades() {
            try {
                const res = await getNovedades();
                this.novedades = res.data;
                if (this.datosCargados > 1) {
                    this.filtrar();
                } else {
                    this.datosCargados++;
                }
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        handleRequestError(error: AxiosError) {
            console.error("Error en la solicitud:", error);

            if (error.response && error.response.status === 401) {
                // Manejar la lógica de redirección a la página de inicio de sesión
                localStorage.removeItem("username");
                localStorage.removeItem("roles");
                localStorage.removeItem("token");
                this.$router.push("/login");
            } else {
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        formatearFecha(fechaString: string): string {
            const fecha: Date = new Date(fechaString);
            const opcionesDeFormato: Intl.DateTimeFormatOptions = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            };
            const formatoFecha = new Intl.DateTimeFormat(
                "es-AR",
                opcionesDeFormato
            );

            return formatoFecha.format(fecha);
        },
        quitarDuplicados(lista: ITurno[]): ITurno[] {
            const mapa: Map<string, ITurno> = new Map();

            for (const elemento of lista) {
                // Utilizamos el ID como clave en el mapa
                if (!mapa.has(elemento.turno)) {
                    mapa.set(elemento.turno, elemento);
                } else if (
                    mapa.has(elemento.turno) &&
                    elemento.circular === "HD32"
                ) {
                    mapa.set(elemento.turno, elemento);
                }
            }
            // Convertir los valores del mapa de nuevo a una lista
            return Array.from(mapa.values());
        },
        viewDetail(turno: ITurno) {
            if (turno.viewDetail) {
                turno.viewDetail = false;
            } else {
                turno.viewDetail = true;
            }
        },
        compararHoras(hora1: string, hora2: string): number {
            // Extraer las horas y minutos de cada cadena
            const [hora1Hours, hora1Minutes] = hora1.split(":").map(Number);
            const [hora2Hours, hora2Minutes] = hora2.split(":").map(Number);

            // Comparar horas
            if (hora1Hours !== hora2Hours) {
                return hora1Hours - hora2Hours;
            }

            // Si las horas son iguales, comparar minutos
            return hora1Minutes - hora2Minutes;
        },
        filtrar() {
            window.localStorage.setItem(
                "dotacionSeleccionada",
                this.checkboxDotacion
            );
            window.localStorage.setItem("itSeleccionada", this.checkboxIt);

            let turnosGuardas = this.turnos.filter((turno: ITurno) => {
                return (
                    turno.dotacion == this.checkboxDotacion &&
                    this.checkboxIt == turno.itinerario &&
                    turno.especialidad == "Guardatren electrico" &&
                    !turno.ordenes
                );
            });
            let turnosConductor = this.turnos.filter((turno: ITurno) => {
                return (
                    turno.dotacion == this.checkboxDotacion &&
                    this.checkboxIt == turno.itinerario &&
                    turno.especialidad == "Conductor electrico" &&
                    !turno.ordenes
                );
            });
            this.turnosGuardasOrd = this.turnos.filter((turno: ITurno) => {
                return (
                    turno.dotacion == this.checkboxDotacion &&
                    this.checkboxIt == turno.itinerario &&
                    turno.especialidad == "Guardatren electrico" &&
                    turno.ordenes
                );
            });
            this.turnosConductorOrd = this.turnos.filter((turno: ITurno) => {
                return (
                    turno.dotacion == this.checkboxDotacion &&
                    this.checkboxIt == turno.itinerario &&
                    turno.especialidad == "Conductor electrico" &&
                    turno.ordenes
                );
            });
            turnosGuardas = this.quitarDuplicados(turnosGuardas);
            turnosConductor = this.quitarDuplicados(turnosConductor);

            this.turnosGuardas = turnosGuardas.sort(
                (turno1: ITurno, turno2: ITurno) => {
                    return this.compararHoras(turno1.toma, turno2.toma);
                }
            );
            this.turnosConductor = turnosConductor.sort(
                (turno1: ITurno, turno2: ITurno) => {
                    return this.compararHoras(turno1.toma, turno2.toma);
                }
            );
            this.turnosGuardasOrd = this.turnosGuardasOrd.sort(
                (turno1: ITurno, turno2: ITurno) => {
                    return this.compararHoras(turno1.toma, turno2.toma);
                }
            );
            this.turnosConductorOrd = this.turnosConductorOrd.sort(
                (turno1: ITurno, turno2: ITurno) => {
                    return this.compararHoras(turno1.toma, turno2.toma);
                }
            );

            this.buscarPersonalACargo(
                this.obtenerFecha(this.inputDate, this.today),
                turnosConductor,
                this.personales
            );
            this.buscarPersonalACargo(
                this.obtenerFecha(this.inputDate, this.today),
                turnosGuardas,
                this.personales
            );
            this.buscarPersonalACargo(
                this.obtenerFecha(this.inputDate, this.today),
                this.turnosConductorOrd,
                this.personales
            );
            this.buscarPersonalACargo(
                this.obtenerFecha(this.inputDate, this.today),
                this.turnosGuardasOrd,
                this.personales
            );
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
        filtroTrenes(
            itinerario: string,
            listaTurnos: ITurno[],
            circularSeleccionada: string[],
            tren: number
        ) {
            /* Este método buscar y filtra en el array turno el tren que se desea buscar.
            guarda en el array indFiltrado el resultado (los turnos que viajan en el tren). */
            const turnosEnTren: ITurno[] = [];
            listaTurnos.forEach((diag: ITurno) => {
                for (let i = 0; i < diag.vueltas.length; i++) {
                    if (
                        diag.vueltas[i].tren === tren &&
                        diag.itinerario === itinerario &&
                        circularSeleccionada.includes(diag.circular)
                    ) {
                        turnosEnTren.push(diag);
                    }
                }
            });
            return turnosEnTren;
        },
        esFechaMayorIgual(dateMayor: string, dateMenor: string) {
            if (dateMayor && dateMenor) {
                const formattedDateMayor = new Date(dateMayor)
                    .toISOString()
                    .split("T")[0];
                const formattedDateMenor = new Date(dateMenor)
                    .toISOString()
                    .split("T")[0];
                return formattedDateMayor >= formattedDateMenor;
            } else {
                return false;
            }
        },
        filtroPersonal(turno: string, fecha: Date, personales: IPersonal[]) {
            try {
                let filtrados: IPersonal[];
                turno = turno.trim();

                if (
                    turno.indexOf(".") !== -1 &&
                    !turno.toLowerCase().includes("prog")
                ) {
                    const indexPunto = turno.indexOf(".");
                    const diaLab = Number(turno[indexPunto + 1]);
                    const diag = turno.split(".")[0];
                    const franco = this.dia_laboral(diaLab, fecha.getDay());

                    filtrados = personales.filter((personal) => {
                        return (
                            personal.turno === diag &&
                            Number(personal.franco) === franco
                        );
                    });
                } else {
                    filtrados = personales.filter(
                        (personal) =>
                            personal.turno.toLowerCase() === turno.toLowerCase()
                    );
                }
                const titular: IPersonal = filtrados[0];
                return {
                    turno: turno,
                    legajo: titular.legajo || 0,
                    nombres: titular
                        ? `${titular.apellido} ${titular.nombres}`
                        : "",
                };
            } catch (e) {
                console.error(e);
                return {};
            }
        },
        dia_laboral(diaLaboral: number, hoy: number) {
            /*   # devuelve el día de la semana como un número entero donde el Domingo 
            está indexado como 0 y el Sábado como 6
            Al ingresarle por parámetros la cantidad de días del turno pos franco y 
            el dia de la semana actual devuelve el dia del franco del turno mismo. */
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
        },
        buscarPersonalACargo(
            fecha: Date,
            turnosAImprimir: ITurno[],
            personales: IPersonal[]
        ) {
            try {
                turnosAImprimir.forEach((turno: ITurno) => {
                    const personal = this.filtroPersonal(
                        turno.turno,
                        fecha,
                        personales
                    );

                    this.novedades.forEach((novedad: Novedad) => {
                        const {
                            legajo,
                            fechaBaja,
                            fechaAlta,
                            HNA,
                            novedadInactiva,
                        } = novedad;

                        if (
                            legajo === personal.legajo &&
                            !novedadInactiva &&
                            ((HNA &&
                                this.esFechaMayorIgual(
                                    this.inputDate,
                                    fechaBaja
                                )) ||
                                (this.esFechaMayorIgual(
                                    this.inputDate,
                                    fechaBaja
                                ) &&
                                    this.esFechaMayorIgual(
                                        fechaAlta,
                                        this.inputDate
                                    )))
                        ) {
                            personal.nombres =
                                this.obtenerNombreConReemplazo(novedad);
                        }
                    });

                    // Asignar personal al array turnosAImprimir
                    if (personal.nombres !== undefined) {
                        turno.personal = personal.nombres;
                    }
                });
            } catch (error) {
                console.error("Error en buscarPersonalACargo:", error);
            }
        },
        obtenerNombreConReemplazo(novedad: Novedad): string {
            if (novedad.remplazo && novedad.remplazo.length > 0) {
                // buscamos el primero que cumple con la fecha input sea mayorIgual inicio de relevo Y si existe finRelevo que sea mayorIgual a inputDate SINO la que no tenga fin de relevo
                const remplazo = novedad.remplazo.find((remplazo: Remplazo) => {
                    return (
                        this.esFechaMayorIgual(
                            this.inputDate,
                            remplazo.inicioRelevo
                        ) &&
                        ((remplazo.finRelevo &&
                            this.esFechaMayorIgual(
                                remplazo.finRelevo,
                                this.inputDate
                            )) ||
                            !remplazo.finRelevo)
                    );
                });
                if (remplazo) {
                    return `${remplazo.apellido} ${remplazo.nombres}`;
                } else {
                    return "Sin Cubrir";
                }
            } else {
                return "Sin Cubrir";
            }
        },
        obtenerTiposCirculares(turnos: ITurno[]) {
            // Filtramos aquellos turnos que tengan definida la propiedad "circular"
            const turnosFiltrados = turnos.filter(
                (turno) => turno.circular !== undefined
            );

            // Usamos Set para obtener valores únicos de la propiedad "circular"
            const circularesUnicas = [
                ...new Set(turnosFiltrados.map((turno) => turno.circular)),
            ];

            return circularesUnicas;
        },
        cambioCirculares() {
            window.localStorage.setItem(
                "circularSeleccionada",
                this.circularSeleccionada.join(",")
            );

            this.filtrar();
        },
        handleAsideBarVisibility(isVisible: boolean) {
            this.isAsideBarVisible = isVisible;
        },
    },
    created() {
        try {
            this.loadTurnos();
            this.loadPersonales();
            this.loadNovedades();
            this.today.setHours(12, 0, 0, 0);
            newToken();
            const dotacionSelectString = window.localStorage.getItem(
                "dotacionSeleccionada"
            );
            this.checkboxDotacion = dotacionSelectString
                ? dotacionSelectString
                : "";
            const itSelectString =
                window.localStorage.getItem("itSeleccionada");
            this.checkboxIt = itSelectString ? itSelectString : "";
        } catch (error) {
            console.error(error);
        }
    },
    name: "App",
    components: {
        NavBar,
        asideBar,
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
.fila-oscura {
    background-color: #e14646 !important; /* Cambia este color según tus preferencias */
    color: #fff; /* Cambia este color según tus preferencias */
}
.body{
        position: relative;
        padding: 5rem 0;
        min-height: 100vh;
    }
    #layoutSidenav_content{
        position:absolute;
        top:0;
        left: 0;
        z-index: 0;
        /* margin-top: 1rem; */
        /* margin-left: 250px; */
    }
    .layoutSidenav_content-width-min {
        margin-left: 0;
        width: 100vw;

    }
    .layoutSidenav_content-width-max {
        margin-left: 225px;
        width: calc(100vw - 225px);
        /* width: calc(100vw - 242px); */
    }
    @media (max-width: 991px) {
        .layoutSidenav_content-width-max {
        margin-left: 0px;
        width: 100%;
    }
    }
</style>
