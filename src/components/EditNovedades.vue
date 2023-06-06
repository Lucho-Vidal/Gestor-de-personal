<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Editar Novedad
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
                            autofocus
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
                            disabled
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label for="Tipo">Tipo de Novedad </label>
                        <select name="Tipo" id="Tipo" class="form-control mb-3">
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
                            autofocus
                        />
                    </div>
                    <div class="col-3">
                        <label for="FechaAlta"></label>
                            Fecha de fin
                            <input
                            class="form-control mb-3"
                            type="Datetime-local"
                            name="FechaAlta"
                            autofocus
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
                            autofocus
                            ></textarea>
                    </div>
                </div>
                
                
                <button class="btn btn-primary w-80">Guardar</button>
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
import { createNovedad } from "../services/novedadesService";

export default defineComponent({
    data() {
        return {
            newNovedad: {} as Novedad,
        };
    },
    methods: {
        async saveNovedad() {
            try {
                const res = await createNovedad(this.newNovedad);
                console.log(res);
                this.$router.push({name: "Novedades"})
            } catch (error) {
                console.log(error);
                
            }
            
        },
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
