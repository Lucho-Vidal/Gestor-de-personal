<template>
    <div>
        <NavBar />

        <main class="container">
            <h2 class="d-flex justify-content-center m-3">
                Lista de registros
            </h2>

            <table
                v-if="registros.length > 0"
                class="table table-striped table-hover"
            >
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">usuario</th>
                        <th class="col-1" colspan="1">fecha</th>
                        <th class="col-1" colspan="1">Accion</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(registro, index) in registros"
                    :key="index"
                    @click="viewDetail(registro)"
                >
                    <tr class="Small shadow">
                        <td class="col-1">{{ registro.usuario }}</td>
                        <td class="col-1">{{ formatearFecha(registro.fecha) }}</td>
                        <td class="col-1">{{ registro.accion }}</td>
                    </tr>
                    <tr v-if="registro.viewDetail">
                        <td colspan="12">
                            <div class="row" v-if="registro.novedad">
                                <h6 class="col-2">Novedad:{{ registro.novedad._id }}</h6>
                                <p class="col-3">
                                    Personal:{{ registro.novedad.apellido +" "+ registro.novedad.nombres   }}
                                </p>
                                <p class="col-3">
                                    Tipo:{{ registro.novedad.tipoNovedad  }}
                                </p>
                                <p class="col-3">
                                    Baja:{{ registro.novedad.fechaBaja   }} Alta: {{ registro.novedad.fechaAlta }}
                                </p>
                                <p class="col-3">
                                    Remplazo:{{ registro.novedad.remplazo  }}
                                </p>
                                
                            </div>
                            <div class="row" v-if="registro.personal">
                                <h6 class="col-2">Novedad:{{ registro.personal.legajo }}</h6>
                                <p class="col-3">
                                    Personal:{{ registro.personal.apellido +" "+ registro.personal.nombres   }}
                                </p>
                                <p class="col-3">
                                    Dotacion:{{ registro.personal.dotacion  }}
                                </p>
                                <p class="col-3">
                                    Especialidad:{{ registro.personal.especialidad   }} Franco: {{ registro.personal.franco }}
                                </p>
                                <p class="col-3">
                                    Turno:{{ registro.personal.turno  }}
                                </p>
                                
                            </div>
                            <div class="row" v-if="registro.turno">
                                <h6 class="col-2">Novedad:{{ registro.turno.turno }}</h6>
                                <p class="col-3">
                                    Jornada:{{ registro.turno.toma +" / "+ registro.turno.deja   }}
                                </p>
                                <p class="col-3">
                                    Circular:{{ registro.turno.circular   }} Itinerario: {{ registro.turno.itinerario }}
                                </p>
                                <p class="col-3">
                                    Vueltas:{{ registro.turno.vueltas  }}
                                </p>
                                
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
import NavBar from "./NavBar.vue";
import FooterPage from "./FooterPage.vue";
import { newToken } from '../services/signService';
import { Registro } from "../interfaces/IRegistro";
import { getRegistros } from "../services/registrosService";

export default defineComponent({
    data() {
        return {
            registros:[] as Registro[],
        };
    },
    methods: {
        async loadRegistros() {
            const res = await getRegistros();
            this.registros = res.data;
            this.ordenarRegistros();

        },
        formatearFecha(fechaString: string): string {
            const fecha:Date = new Date(fechaString);
            const opcionesDeFormato: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric',hour:'2-digit',minute:'2-digit' };
            const formatoFecha = new Intl.DateTimeFormat('es-AR', opcionesDeFormato);

            return formatoFecha.format(fecha);
        },
        ordenarRegistros() {
            this.registros.sort((a, b) => b.fecha > a.fecha ? 1 : -1);
        },
        viewDetail(registro: Registro) {
            if (registro.viewDetail) {
                registro.viewDetail = false;
            } else {
                registro.viewDetail = true;
            }
        },        
    },
    created() {
        this.loadRegistros();
        newToken();
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
