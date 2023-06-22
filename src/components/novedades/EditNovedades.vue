<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">Editar Novedad</h1>

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

            <form @submit.prevent="handleUpdateNovedad()" class="row">
                <div class="row">
                    <div class="col-2">
                        <label for="legajo"></label>
                        Legajo
                        <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="text"
                            name="legajo"
                            v-model="novedad.legajo"
                            autofocus
                        />
                    </div>
                    <div class="col-3">
                        <label for="apellido"></label>
                        Apellido
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="apellido"
                            v-model="novedad.apellido"
                            disabled
                        />
                    </div>
                    <div class="col-4">
                        <label for="nombre"></label>
                        Nombre
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="nombre"
                            v-model="novedad.nombres"
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
                            v-model="novedad.base"
                            disabled
                        />
                    </div>
                    <div class="col-3">
                        <label for="especialidad"></label>
                        Especialidad
                        <input
                            class="form-control mb-3"
                            type="text"
                            name="especialidad"
                            v-model="novedad.especialidad"
                            disabled
                        />
                    </div>
                    <div class="col-2">
                        <label for="turno"></label>
                        Turno
                        <input
                            class="form-control mb-3"
                            type="text"
                            name="turno"
                            v-model="novedad.turno"
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
                            v-model="novedad.franco"
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
                            v-model="novedad.tipoNovedad"
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
                            v-model="novedad.fechaBaja"
                        />
                    </div>
                    <div class="form-check form-check-inline m-0">
                        <input
                            class="form-check-input valoresCheck"
                            type="checkbox"
                            name="HNA"
                            id="HNA"
                            checked
                            v-model="novedad.HNA"
                        />
                        <label class="form-check-label" for="HNA">HNA</label>
                    </div>
                    <div class="col-3" v-if="!novedad.HNA">
                        <label for="fechaAlta"></label>
                        Fecha de fin
                        <input
                            class="form-control mb-3"
                            type="Date"
                            name="fechaAlta"
                            v-model="novedad.fechaAlta"
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
                            v-model="novedad.detalle"
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
                            v-for="(remplazo, index) in novedad.remplazo"
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
                                    @click="novedad.remplazo.splice(index, 1)"
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
import { Novedad, Remplazo } from "../../interfaces/INovedades";
import { getNovedad, updateNovedad } from "../../services/novedadesService";
import { IPersonal } from "../../interfaces/IPersonal";
import { getPersonales } from "../../services/personalService";

export default defineComponent({
    data() {
        return {
            novedad: {} as Novedad,
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
        async loadNovedad(id: string) {
            try {
                const { data } = await getNovedad(id);
                this.novedad = data;
            } catch (error) {
                console.error(error);
            }
        },
        async loadPersonales() {
            const res = await getPersonales();
            this.personales = res.data;
        },
        async handleUpdateNovedad() {
            try {
                if (typeof this.$route.params.id === "string") {
                    await updateNovedad(this.$route.params.id, this.novedad);
                    this.$router.push(`/novedades`);
                }
            } catch (error) {
                console.error(error);
            }
        },
        selectPersonal(personal: IPersonal) {
            this.novedad.legajo = personal.legajo;
            this.novedad.apellido = personal.apellido;
            this.novedad.nombres = personal.nombres;
            this.novedad.especialidad = personal.especialidad;
            this.novedad.turno = personal.turno;
            this.novedad.franco = parseInt(personal.franco);
            this.novedad.base = personal.dotacion;
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

            if (this.novedad.remplazo === undefined) {
                this.novedad.remplazo = [remplazo];
            } else {
                this.novedad.remplazo.push(remplazo);
            }

            console.log(this.novedad);
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
    },
    mounted() {
        if (typeof this.$route.params.id === "string") {
            this.loadNovedad(this.$route.params.id);
        }
        this.loadPersonales();
        this.novedad.HNA = true;
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
</style>
