<template>
            <main>
                <div class="container-fluid px-4">
                    <h2 class="d-flex justify-content-center m-3">
                        Lista de personales
                    </h2>
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
                                        v-if="turnosConductor.length > 0"
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
                                        v-if="turnosConductorOrd.length > 0"
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
                                        v-if="turnosGuardas.length > 0"
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
                                        v-if="turnosGuardasOrd.length > 0"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { newToken } from "../../services/signService";
import { IPersonal } from "../../interfaces/IPersonal";
import { getTurnos } from "../../services/turnosService";
import { ITurno } from "../../interfaces/ITurno";
import { AxiosError } from "axios";
import { getNovedades } from "../../services/novedadesService";
import { getPersonales } from "../../services/personalService";
import { Novedad } from "../../interfaces/INovedades";
import { compararHoras, handleRequestError, quitarDuplicados, buscarPersonalACargo, obtenerTiposCirculares, loadCambiosTurnos } from '../../utils/funciones';
import { CambioTurno } from "../../interfaces/ICambioTurno";

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
            circularSeleccionada: ["Jul24"] as string[],
            datosCargados: 0 as number,
            cambiosTurnos: [] as  CambioTurno[],
        };
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
                this.circulares = obtenerTiposCirculares(this.turnos);
                if (this.datosCargados > 1) {
                    this.filtrar();
                } else {
                    this.datosCargados++;
                }
            } catch (error) {
                handleRequestError(error as AxiosError);
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
                handleRequestError(error as AxiosError);
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
                handleRequestError(error as AxiosError);
            }
        },
        viewDetail(turno: ITurno) {
            if (turno.viewDetail) {
                turno.viewDetail = false;
            } else {
                turno.viewDetail = true;
            }
        },
        filtrar() {
            
            window.localStorage.setItem(
                "dotacionSeleccionada",
                this.checkboxDotacion
            );
            window.localStorage.setItem("itSeleccionada", this.checkboxIt);

            let turnosGuardas = this.turnos.filter((turno: ITurno) => {
                return (
                    this.circularSeleccionada.includes(turno.circular) &&
                    turno.dotacion == this.checkboxDotacion &&
                    this.checkboxIt == turno.itinerario &&
                    (turno.especialidad.toLowerCase() == "guardatren electrico"||turno.especialidad.toLowerCase() == "guardatren diesel") &&
                    !turno.ordenes
                );
            });
            let turnosConductor = this.turnos.filter((turno: ITurno) => {
                return (
                    this.circularSeleccionada.includes(turno.circular) &&
                    turno.dotacion == this.checkboxDotacion &&
                    this.checkboxIt == turno.itinerario &&
                    (turno.especialidad.toLowerCase() == "conductor electrico"||turno.especialidad.toLowerCase() == "conductor diesel") &&
                    !turno.ordenes
                );
            });
            let turnosGuardasOrd = this.turnos.filter((turno: ITurno) => {
                return (
                    this.circularSeleccionada.includes(turno.circular) &&
                    turno.dotacion == this.checkboxDotacion &&
                    this.checkboxIt == turno.itinerario &&
                    (turno.especialidad.toLowerCase() == "guardatren electrico"||turno.especialidad.toLowerCase() == "guardatren diesel") &&
                    turno.ordenes
                );
            });
            let turnosConductorOrd = this.turnos.filter((turno: ITurno) => {
                return (
                    this.circularSeleccionada.includes(turno.circular) &&
                    turno.dotacion == this.checkboxDotacion &&
                    this.checkboxIt == turno.itinerario &&                    
                    (turno.especialidad.toLowerCase() == "conductor electrico"||turno.especialidad.toLowerCase() == "conductor diesel") &&
                    turno.ordenes
                );
            });
            turnosGuardas = quitarDuplicados(turnosGuardas,this.circularSeleccionada);
            turnosConductor = quitarDuplicados(turnosConductor,this.circularSeleccionada);
            turnosGuardasOrd = quitarDuplicados(turnosGuardasOrd,this.circularSeleccionada);
            turnosConductorOrd = quitarDuplicados(turnosConductorOrd,this.circularSeleccionada);

            this.turnosGuardas = turnosGuardas.sort(
                (turno1: ITurno, turno2: ITurno) => {
                    return compararHoras(turno1.toma, turno2.toma);
                }
            );
            this.turnosConductor = turnosConductor.sort(
                (turno1: ITurno, turno2: ITurno) => {
                    return compararHoras(turno1.toma, turno2.toma);
                }
            );
            this.turnosGuardasOrd = turnosGuardasOrd.sort(
                (turno1: ITurno, turno2: ITurno) => {
                    return compararHoras(turno1.toma, turno2.toma);
                }
            );
            this.turnosConductorOrd = turnosConductorOrd.sort(
                (turno1: ITurno, turno2: ITurno) => {
                    return compararHoras(turno1.toma, turno2.toma);
                }
            );

            buscarPersonalACargo(
                this.obtenerFecha(this.inputDate, this.today),
                this.inputDate,
                turnosConductor,
                this.personales,
                this.novedades,
                this.cambiosTurnos,
            );
            buscarPersonalACargo(
                this.obtenerFecha(this.inputDate, this.today),
                this.inputDate,
                turnosGuardas,
                this.personales,
                this.novedades,
                this.cambiosTurnos,
            );
            buscarPersonalACargo(
                this.obtenerFecha(this.inputDate, this.today),
                this.inputDate,
                this.turnosConductorOrd,
                this.personales,
                this.novedades,
                this.cambiosTurnos,
            );
            buscarPersonalACargo(
                this.obtenerFecha(this.inputDate, this.today),
                this.inputDate,
                this.turnosGuardasOrd,
                this.personales,
                this.novedades,
                this.cambiosTurnos,
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
        cambioCirculares() {
            window.localStorage.setItem(
                "circularSeleccionada",
                this.circularSeleccionada.join(",")
            );
            
            this.filtrar();
        },
    },
    async created() {
        try {
            this.loadTurnos();
            this.loadPersonales();
            this.loadNovedades();
            this.cambiosTurnos = await loadCambiosTurnos() || [];
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
    background-color: #e14646 !important; 
    color: #fff;
}
</style>
