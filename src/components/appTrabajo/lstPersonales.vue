<template>
    <div>
        <NavBar />

        <main class="container">
            <h2 class="d-flex justify-content-center m-3">
                Lista de personales
            </h2>
            <select
                name="dotacion"
                id="dotacion"
                class="form-control mb-3"
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

            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <ul class="list-unstyled">
                            <li>
                                Conductores
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul class="list-unstyled">
                            <li>
                                GuardaTrenes
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <!-- <table
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
            </table> -->
        </main>
        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { newToken } from '../../services/signService';
import { IPersonal } from "../../interfaces/IPersonal";
import { getTurnos } from "../../services/turnosService";
import { ITurno } from "../../interfaces/ITurno";
import { AxiosError } from "axios";
import { getNovedades } from "../../services/novedadesService";
import { getPersonales } from "../../services/personalService";
import { Novedad } from "../../interfaces/INovedades";


export default defineComponent({
    data() {
        return {
            personales:[] as IPersonal[],
            turno: [] as ITurno[],
            novedades : [] as Novedad[],
            today: new Date(),
            checkboxDotacion: [] as string[],

        };
    },
    methods: {
        async loadTurnos() {
            /* Trae todos los elementos de la base de datos  */
            try {
                const res = await getTurnos();
                this.turno = res.data;
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        async loadPersonales() {
            try {
                /* Trae todos los elementos de la base de datos */
                const res = await getPersonales();
                this.personales = res.data;
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        async loadNovedades() {
            try {
                const res = await getNovedades();
                this.novedades = res.data;
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        handleRequestError(error: AxiosError) {
            console.error("Error en la solicitud:", error);

            if (error.response && error.response.status === 401) {
                // Manejar la lógica de redirección a la página de inicio de sesión
                this.$router.push("/login");
            } else {
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        formatearFecha(fechaString: string): string {
            const fecha:Date = new Date(fechaString);
            const opcionesDeFormato: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric',hour:'2-digit',minute:'2-digit' };
            const formatoFecha = new Intl.DateTimeFormat('es-AR', opcionesDeFormato);

            return formatoFecha.format(fecha);
        },
        
        viewDetail(turno: ITurno) {
            if (turno.viewDetail) {
                turno.viewDetail = false;
            } else {
                turno.viewDetail = true;
            }
        },      
        filtrar(){
            console.log(this.checkboxDotacion);
            
        }  
    },
    created() {
        try {
            this.loadTurnos();
            this.loadPersonales();
            this.loadNovedades();
            this.today.setHours(12, 0, 0, 0);
            newToken();
        } catch (error) {
            console.error(error);
        }
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
