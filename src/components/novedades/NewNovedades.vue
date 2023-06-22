<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Cargar Nueva Novedad
            </h1>

            <!-- <modalBuscarPersonal :personales="personales" /> -->

            <button
                type="button"
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalBuscar"
            >
                Buscar Personal
            </button>

            <div
                class="modal fade"
                id="modalBuscar"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Buscar Personal
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <input
                                type="text"
                                class="form-control my-3"
                                placeholder="Ingrese Nombre o Apellido"
                                list="personales"
                                v-model="search"
                                autofocus
                                @keyup="searchPersonal()"
                            />
                            <table class="table table-hover" v-if="search">
                                <thead>
                                    <tr>
                                        <th>Legajo</th>
                                        <th>Apellido</th>
                                        <th>Nombre</th>
                                        <th>Dotacion</th>
                                        <th>Turno</th>
                                        <th>Franco</th>
                                        <th>Especialidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(
                                            personal, index
                                        ) in personalEncontrado"
                                        :key="index"
                                        @click="selectPersonal(personal)"
                                    >
                                        <td class="col-1">
                                            {{ personal.legajo }}
                                        </td>
                                        <td class="col-1">
                                            {{ personal.apellido }}
                                        </td>
                                        <td class="col-2">
                                            {{ personal.nombres }}
                                        </td>
                                        <td class="col-1">
                                            {{ personal.dotacion }}
                                        </td>
                                        <td class="col-1">
                                            {{ personal.turno }}
                                        </td>
                                        <td class="col-1">
                                            {{ personal.franco }}
                                        </td>
                                        <td class="col-1">
                                            {{ personal.especialidad }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <form @submit.prevent="saveNovedad()" class="row">
                <div class="row">
                    <div class="col-2">
                        <label for="legajo"></label>
                        Legajo
                        <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="number"
                            name="legajo"
                            autofocus
                            required
                            @change="searchPersonalById()"
                            v-model="newNovedad.legajo"
                        />
                    </div>
                    <div class="col-3">
                        <label for="Apellido"></label>
                        Apellido
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="apellido"
                            v-model="newNovedad.apellido"
                            disabled
                        />
                    </div>
                    <div class="col-4">
                        <label for="nombres"></label>
                        Nombre
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="nombres"
                            v-model="newNovedad.nombres"
                            disabled
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label for="base"></label>
                        Base
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="base"
                            v-model="newNovedad.base"
                            disabled
                        />
                    </div>
                    <div class="col-3">
                        <label for="especialidad"></label>
                        Especialidad
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="especialidad"
                            v-model="newNovedad.especialidad"
                            disabled
                        />
                    </div>
                    <div class="col-2">
                        <label for="turno"></label>
                        Turno
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="turno"
                            v-model="newNovedad.turno"
                            disabled
                        />
                    </div>
                    <div class="col-2">
                        <label for="franco"></label>
                        Franco
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="franco"
                            v-model="days[newNovedad.franco]"
                            disabled
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label for="tipoNovedad">Tipo de Novedad </label>
                        <select
                            name="tipoNovedad"
                            id="tipoNovedad"
                            class="form-control mb-3"
                            v-model="newNovedad.tipoNovedad"
                            required
                        >
                            <option value="Ordenamiento">Ordenamiento</option>
                            <option value="Estudio">Estudio</option>
                            <option value="Enfermedad">Enfermedad</option>
                            <option value="ART">ART</option>
                            <option value="Arrollamiento 558">
                                Arrollamiento 558
                            </option>
                            <option value="Resolución 404">
                                Resolución 404
                            </option>
                            <option value="Servicio Especial">
                                Servicio Especial
                            </option>
                            <option value="Tarea Liviana">Tarea Liviana</option>
                            <option value="Licencia Gremial">
                                Licencia Gremial
                            </option>
                            <option value="Ausente">Ausente</option>
                            <option value="Practica">Practica</option>
                            <option value="Suspension">Suspension</option>
                            <option value="Rev. Medica">Rev. Medica</option>
                            <option value="Descanso Anticipado">
                                Descanso Anticipado
                            </option>
                            <option value="Licencia Anual">
                                Licencia Anual
                            </option>
                            <option value="Baja definitiva">
                                Baja definitiva
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label for="fechaBaja"></label>
                        Fecha de inicio
                        <input
                            required
                            class="form-control mb-3"
                            type="Date"
                            name="fechaBaja"
                            v-model="newNovedad.fechaBaja"
                        />
                    </div>
                    <div class="form-check form-check-inline m-0">
                        <input
                            class="form-check-input valoresCheck"
                            type="checkbox"
                            name="HNA"
                            id="HNA"
                            checked
                            v-model="newNovedad.HNA"
                        />
                        <label class="form-check-label" for="HNA">HNA</label>
                    </div>
                    <div class="col-3" v-if="!newNovedad.HNA">
                        <label for="fechaAlta"></label>
                        Fecha de fin
                        <input
                            class="form-control mb-3"
                            type="Date"
                            name="fechaAlta"
                            v-model="newNovedad.fechaAlta"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="detalle"></label>
                        Detalle
                        <textarea
                            class="form-control mb-3"
                            name="detalle"
                            v-model="newNovedad.detalle"
                        ></textarea>
                    </div>
                </div>

                <button
                    type="button"
                    class="btn btn-success col-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalRemplazo"
                >
                    Agregar Remplazo
                </button>

                <div
                    class="modal fade"
                    id="modalRemplazo"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Buscar Personal
                                </h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <input
                                    type="text"
                                    class="form-control my-3"
                                    placeholder="Ingrese algo"
                                    v-model="search"
                                    autofocus
                                    @keyup="searchPersonal()"
                                />
                                <table class="table table-hover" v-if="search">
                                    <thead>
                                        <tr>
                                            <th>Legajo</th>
                                            <th>Apellido</th>
                                            <th>Nombre</th>
                                            <th>Dotacion</th>
                                            <th>Turno</th>
                                            <th>Franco</th>
                                            <th>Especialidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                personal, index
                                            ) in personalEncontrado"
                                            :key="index"
                                            @click="selectRemplazo(personal)"
                                        >
                                            <td class="col-1">
                                                {{ personal.legajo }}
                                            </td>
                                            <td class="col-1">
                                                {{ personal.apellido }}
                                            </td>
                                            <td class="col-2">
                                                {{ personal.nombres }}
                                            </td>
                                            <td class="col-1">
                                                {{ personal.dotacion }}
                                            </td>
                                            <td class="col-1">
                                                {{ personal.turno }}
                                            </td>
                                            <td class="col-1">
                                                {{
                                                    days[
                                                        parseInt(
                                                            personal.franco
                                                        )
                                                    ]
                                                }}
                                            </td>
                                            <td class="col-1">
                                                {{ personal.especialidad }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Legajo</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Función</th>
                            <th>Desde</th>
                            <th>Hasta</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(remplazo, index) in newNovedad.remplazo"
                            :key="index"
                        >
                            <td>
                                {{ remplazo.legajo }}
                            </td>
                            <td>
                                {{ remplazo.apellido }}
                            </td>
                            <td>
                                {{ remplazo.nombres }}
                            </td>
                            <td>
                                {{ remplazo.especialidad }}
                            </td>
                            <td>
                                <input
                                    required
                                    class="form-control mb-3"
                                    type="Date"
                                    name="FechaBaja"
                                    v-model="remplazo.inicioRelevo"
                                />
                            </td>
                            <td>
                                <input
                                    class="form-control mb-3"
                                    type="Date"
                                    name="FechaBaja"
                                    v-model="remplazo.finRelevo"
                                />
                            </td>
                            <td>
                                <i
                                    class="fa-solid fa-x fa-xl"
                                    style="color: #ff0000"
                                    @click="newNovedad.remplazo.splice( index, 1 )"
                                ></i>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button class="btn btn-primary col-1">Guardar</button>
            </form>
        </main>

        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { Novedad, Remplazo } from '../../interfaces/INovedades';
import {
    createNovedad,
    getUltimaNovedad,
} from "../../services/novedadesService";
import { getPersonales } from "../../services/personalService";
import { IPersonal } from "../../interfaces/IPersonal";

export default defineComponent({
    data() {
        return {
            newNovedad: {} as Novedad,
            ultimoId: 0,
            personales: [] as IPersonal[],
            days: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ],
            search: "" as string,
            personalEncontrado: [] as IPersonal[],
        };
    },
    methods: {
        async saveNovedad() {
            try {
                this.newNovedad._id = this.ultimoId + 1;
                if (this.newNovedad.HNA) {
                    this.newNovedad.fechaAlta = "";
                }
                console.log(this.newNovedad);
                
                const res = await createNovedad(this.newNovedad);
                console.log(res);
                this.$router.push({ name: "Novedades" });
            } catch (error) {
                console.log(error);
            }
        },
        async obtenerUltimoId() {
            const res = await getUltimaNovedad();
            this.ultimoId = res.data[0]._id;
        },
        async loadPersonales() {
            const res = await getPersonales();
            this.personales = res.data;
        },
        cargarPersonal() {
            console.log();
        },
        selectPersonal(personal: IPersonal) {
            this.newNovedad.legajo = personal.legajo;
            this.newNovedad.apellido = personal.apellido;
            this.newNovedad.nombres = personal.nombres;
            this.newNovedad.especialidad = personal.especialidad;
            this.newNovedad.turno = personal.turno;
            this.newNovedad.franco = parseInt(personal.franco);
            this.newNovedad.base = personal.dotacion;
        },
        selectRemplazo(personal: IPersonal) {
            let remplazo = {
                legajo: personal.legajo,
                apellido: personal.apellido,
                nombres: personal.nombres,
                base: personal.dotacion,
                especialidad: personal.especialidad,
                turno: personal.turno,
                franco: personal.franco,
                HNA: false,
            } as Remplazo;

            if (this.newNovedad.remplazo === undefined) {
                this.newNovedad.remplazo = [remplazo];
            } else {
                this.newNovedad.remplazo.push(remplazo);
            }

            console.log(this.newNovedad);
        },
        searchPersonal() {
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return (
                        personal.apellido.toLowerCase() +
                        " " +
                        personal.nombres.toLowerCase()
                    ).includes(this.search.toLowerCase());
                }
            );
        },
        searchPersonalById() {
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return personal.legajo == this.newNovedad.legajo;
                }
            );
            if (this.personalEncontrado[0]) {
                this.selectPersonal(this.personalEncontrado[0]);
            }
        },
    },
    mounted() {
        this.obtenerUltimoId();
        this.loadPersonales();
        this.newNovedad.HNA = true;
    },
    components: {
        NavBar,
        FooterPage,
    },
});
</script>
<style>
main {
    min-height: 87vh;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.8);
}
.Modal {
    position: fixed;

    transform: translate((-50%, -50%));
    background: #fff;
    padding: 70px;
    border-radius: 15px;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
    z-index: 101;
}
</style>
