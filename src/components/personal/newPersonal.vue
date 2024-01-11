<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Cargar Nuevo Personal
            </h1>
            <div class="alert alert-danger" role="alert" v-if="alerta">
                <h4 class="alert-heading">ATENCIÓN!</h4>
                <hr />
                {{ alerta }}
            </div>
            <!-- <modalBuscarPersonal :personales="personales" /> -->

            <form @submit.prevent="savePersonal()" class="row">
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
                            v-model="newPersonal.legajo"
                            @change="searchPersonalPorLegajo()"
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
                            v-model="newPersonal.apellido"
                            required
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
                            v-model="newPersonal.nombres"
                            required
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label for="base">Base </label>
                        <select
                            name="base"
                            id="base"
                            class="form-control mb-3"
                            v-model="newPersonal.dotacion"
                        >
                            <option value="PC">PC</option>
                            <option value="LLV">LLV</option>
                            <option value="TY">TY</option>
                            <option value="LP">LP</option>
                            <option value="K5">K5</option>
                            <option value="CÑ">CÑ</option>
                            <option value="AK">AK</option>
                        </select>
                    </div>

                    <div class="col-3">
                        <label for="especialidad">Especialidad </label>
                        <select
                            name="especialidad"
                            id="especialidad"
                            class="form-control mb-3"
                            v-model="newPersonal.especialidad"
                            required
                        >
                            <option value="Conductor electrico">
                                Conductor Eléctrico
                            </option>
                            <option value="Conductor diesel">
                                Conductor Diesel
                            </option>
                            <option value="Ayudante habilitado">
                                Ayudante Habilitado
                            </option>
                            <option value="Ayudante conductor">
                                Ayudante Conductor
                            </option>
                            <option value="GuardaTren electrico">
                                GuardaTren Eléctrico
                            </option>
                            <option value="GuardaTren diesel">
                                GuardaTren Diesel
                            </option>
                        </select>
                    </div>
                    <div class="col-2">
                        <label for="turno"></label>
                        Turno/ Ciclo
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="turno"
                            v-model="newPersonal.turno"
                        />
                    </div>
                    <div class="col-2">
                        <label for="franco">Franco </label>
                        <select
                            name="franco"
                            id="franco"
                            class="form-control mb-3"
                            v-model="newPersonal.franco"
                            required
                        >
                            <option value="0">Domingo</option>
                            <option value="1">Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
                            <option value="6">Sábado</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <label for="orden"></label>
                        Orden
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="number"
                            name="orden"
                            v-model="newPersonal.orden"
                        />
                    </div>
                </div>

                <div
                    class="row"
                    v-if="
                        newPersonal.especialidad.includes('Conductor') ||
                        newPersonal.especialidad.includes('Ayudante')
                    "
                >
                    <h5>Conocimientos</h5>
                    <div class="col-1">
                        <label for="turno"></label>
                        CML
                        <input
                            type="checkbox"
                            v-model="newPersonal.conocimientos.CML"
                        />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        CKD
                        <input
                            type="checkbox"
                            v-model="newPersonal.conocimientos.CKD"
                        />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        RO
                        <input
                            type="checkbox"
                            v-model="newPersonal.conocimientos.RO"
                        />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        MPN
                        <input
                            type="checkbox"
                            v-model="newPersonal.conocimientos.MPN"
                        />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        OL
                        <input
                            type="checkbox"
                            v-model="newPersonal.conocimientos.OL"
                        />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        LCI
                        <input
                            type="checkbox"
                            v-model="newPersonal.conocimientos.LCI"
                        />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        ELEC
                        <input
                            type="checkbox"
                            v-model="newPersonal.conocimientos.ELEC"
                        />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        DUAL
                        <input
                            type="checkbox"
                            v-model="newPersonal.conocimientos.DUAL"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label for="detalle"></label>
                        Observaciones
                        <textarea
                            class="form-control mb-3"
                            name="detalle"
                            v-model="newPersonal.observaciones"
                        ></textarea>
                    </div>
                </div>

                <button class="btn btn-primary col-1 m-2">Guardar</button>
                <i class="btn btn-secondary col-1 m-2" @click="cerrar()"
                    >Cerrar</i
                >
            </form>
        </main>

        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";

import { getPersonales, createPersonal } from "../../services/personalService";
import { IPersonal } from "../../interfaces/IPersonal";
import { newToken } from "../../services/signService";

export default defineComponent({
    data() {
        return {
            newPersonal: {
                legajo: 0,
                apellido: "",
                nombres: "",
                turno: "",
                franco: 0,
                especialidad: "",
                dotacion: "",
                observaciones: "",
                orden: 0,
                conocimientos: {
                    CML: false,
                    CKD: false,
                    RO: false,
                    MPN: false,
                    OL: false,
                    LCI: false,
                    ELEC: false,
                },
            } as IPersonal,
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
            alerta: "" as string,
        };
    },
    methods: {
        async savePersonal() {
            try {
                if (this.alerta) {
                    this.alerta =
                        " ATENCIÓN!!! NO ES POSIBLE CARGAR ESTA NOVEDAD!      " +
                        this.alerta;
                    return;
                }
                console.log(this.newPersonal);
                await createPersonal(this.newPersonal);
                this.$router.push({ name: "Personal" });
            } catch (error) {
                console.error(error);
            }
        },
        cerrar() {
            this.$router.push({ name: "Personal" });
        },
        /* Este método trae la lista de todos los personales */
        async loadPersonales() {
            const res = await getPersonales();
            this.personales = res.data;
        },
        searchPersonalPorLegajo() {
            this.alerta = "";
            this.personales.forEach((personal: IPersonal) => {
                if (personal.legajo == this.newPersonal.legajo) {
                    this.alerta =
                        "El personal ya existe!!! No es posible carga dos personales con el mismo legajo";
                }
            });
        },
    },
    mounted() {
        this.loadPersonales();
        newToken();
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
