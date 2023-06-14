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
                                            {{ days[personal.franco] }}
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
                        <label for="Nombre"></label>
                        Nombre
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="Nombre"
                            v-model="newNovedad.nombres"
                            disabled
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label for="Base"></label>
                        Base
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="Base"
                            v-model="newNovedad.base"
                            disabled
                        />
                    </div>
                    <div class="col-3">
                        <label for="Especialidad"></label>
                        Especialidad
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="Especialidad"
                            v-model="newNovedad.especialidad"
                            disabled
                        />
                    </div>
                    <div class="col-2">
                        <label for="Turno"></label>
                        Turno
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="Turno"
                            v-model="newNovedad.turno"
                            disabled
                        />
                    </div>
                    <div class="col-2">
                        <label for="Franco"></label>
                        Franco
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="Franco"
                            v-model="newNovedad.franco"
                            disabled
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label for="Tipo">Tipo de Novedad </label>
                        <select
                            name="Tipo"
                            id="Tipo"
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
                        <label for="FechaBaja"></label>
                        Fecha de inicio
                        <input
                            required
                            class="form-control mb-3"
                            type="Datetime-local"
                            name="FechaBaja"
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
                        <label for="FechaAlta"></label>
                        Fecha de fin
                        <input
                            class="form-control mb-3"
                            type="Datetime-local"
                            name="FechaAlta"
                            v-model="newNovedad.fechaAlta"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="Detalle"></label>
                        Detalle
                        <textarea
                            class="form-control mb-3"
                            name="Detalle"
                            v-model="newNovedad.Detalle"
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
                                                {{ days[personal.franco] }}
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
                                {{ remplazo.inicioRelevo }}
                            </td>
                            <td>
                                {{ remplazo.inicioRelevo }}
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
import { Novedad } from "../../interfaces/INovedades";
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
                    this.newNovedad.fechaAlta = new Date("");
                }
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
            this.newNovedad.franco = this.days[personal.franco];
            this.newNovedad.base = personal.dotacion;
        },
        selectRemplazo(personal: IPersonal){
            let remplazo = {
                legajo : personal.legajo,
                apellido : personal.apellido,
                nombres : personal.nombres,
                base : personal.dotacion,
                especialidad : personal.especialidad,
                turno : personal.turno,
                franco : personal.franco,
                inicioRelevo : Date(),
                finRelevo: Date(),
                HNA: false
            }
            this.newNovedad.remplazo.push(remplazo); 
        },
        searchPersonal() {
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return (
                        personal.apellido.toLowerCase() + ' ' +
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
