<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Cargar Nueva Novedad
            </h1>
            <form @submit.prevent="saveNovedad()" class="row">
                <div class="row">
                    <div class="col-2">
                        <label for="legajo"></label>
                            Legajo
                            <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="text"
                            name="legajo"
                            autofocus
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
                            disabled
                            v-model="newNovedad.apellido"
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
                    <div class="col-3">
                        <label for="Puesto"></label>
                            Puesto
                            <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="legajo"
                            v-model="newNovedad.puesto"
                            disabled
                        />
                    </div>
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
                        <select name="Tipo" id="Tipo" class="form-control mb-3" v-model="newNovedad.tipoNovedad">
                            <option value="Ordenamiento">Ordenamiento</option>
                            <option value="Estudio">Estudio</option>
                            <option value="Enfermedad">Enfermedad</option>
                            <option value="ART">ART</option>
                            <option value="Arrollamiento 558">Arrollamiento 558</option>
                            <option value="Resolución 404">Resolución 404</option>
                            <option value="Servicio Especial">Servicio Especial</option>
                            <option value="Tarea Liviana">Tarea Liviana</option>
                            <option value="Licencia Gremial">Licencia Gremial</option>
                            <option value="Ausente">Ausente</option>
                            <option value="Practica">Practica</option>
                            <option value="Suspension">Suspension</option>
                            <option value="Rev. Medica">Rev. Medica</option>
                            <option value="Descanso Anticipado">Descanso Anticipado</option>
                            <option value="Licencia Anual">Licencia Anual</option>
                            <option value="Baja definitiva">Baja definitiva</option>
                        </select>
                    </div>
                </div>
                <div class="row">   
                    <div class="col-3">
                        <label for="FechaBaja"></label>
                            Fecha de inicio
                            <input
                            class="form-control mb-3"
                            type="Datetime-local"
                            name="FechaBaja"
                            v-model="newNovedad.fechaBaja"
                        />
                    </div>
                    <div class="col-3">
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
                <button class="btn btn-success col-2">Agregar Remplazo</button>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Legajo
                            </th>
                            <th>
                                Apellido
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Función
                            </th>
                            <th>
                                Desde
                            </th>
                            <th>
                                Hasta
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(remplazo, index) in newNovedad.remplazo" :key="index" >
                            <td>
                                {{remplazo.legajo}}
                            </td>
                            <td>
                                {{ remplazo.apellido }}
                            </td>
                            <td>
                                {{ remplazo.nombres }}
                            </td>
                            <td>
                                {{ remplazo.puesto }}
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
import NavBar from "./NavBar.vue";
import FooterPage from "./FooterPage.vue";
import { Novedad } from "../interfaces/INovedades";
import { createNovedad, getUltimaNovedad } from "../services/novedadesService";
import { getPersonales } from "../services/personalService";
import {  IPersonal } from "../interfaces/IPersonal";

export default defineComponent({
    data() {
        return {
            newNovedad: {} as Novedad,
            ultimoId: 0,
            personales:[] as IPersonal[],
        };
    },
    methods: {
        async saveNovedad() {
            try {
                this.newNovedad._id = this.ultimoId + 1
                const res = await createNovedad(this.newNovedad);
                console.log(res);
                this.$router.push({name: "Novedades"})
            } catch (error) {
                console.log(error);
                
            }
            
        },
        async obtenerUltimoId(){
            const res = await getUltimaNovedad();
            this.ultimoId = res.data[0]._id
        },
        async loadConductores(){
            const res = await getPersonales();
            this.personales = res.data;            
        }
    },
    mounted() {
        this.obtenerUltimoId();
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
