<template>
    <div>
        <NavBar />

        <main class="container">
            <h2 class="d-flex justify-content-center m-3">
                Lista de registros
            </h2>

            <table
                
                class="table table-striped table-hover"
            >
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">Turno</th>
                        <th class="col-1" colspan="1">Tren</th>
                        <th class="col-1" colspan="1">Hora</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(turno, index) in turnosSinCubrir"
                    :key="index"
                >
                    <tr class="Small shadow">
                        <td class="col-1">{{ turno }}</td>
                    </tr>
                    <!-- <tr v-if="registro.viewDetail">
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
                                <h6 class="col-2">Legajo:{{ registro.personal.legajo }}</h6>
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
                                <h6 class="col-2">Turno:{{ registro.turno.turno }}</h6>
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
                    </tr> -->
                </tbody>
            </table>
        </main>

        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { newToken } from '../../services/signService';
import { Registro } from "../../interfaces/IRegistro";
import { AxiosError } from "axios";
import { getTurnos } from "../../services/turnosService";
import { getPersonales } from "../../services/personalService";
import { getNovedades } from "../../services/novedadesService";
import { Novedad, Remplazo } from "../../interfaces/INovedades";
import { IPersonal } from "../../interfaces/IPersonal";
import { ITurno } from "../../interfaces/ITurno";


export default defineComponent({
    data() {
        return {
            turno: [] as ITurno[],
            personales: [] as IPersonal[],
            novedades: [] as Novedad[],
            today: new Date(),
            novedadesDescubiertas: [] as Novedad[],
            trenesDescubiertos: [],
            turnosSinCubrir: [] as string[]
            
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
                this.turnosSinCubrir = this.obtenerNovedadesSinCubrir(this.today);
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
        viewDetail(registro: Registro) {
            if (registro.viewDetail) {
                registro.viewDetail = false;
            } else {
                registro.viewDetail = true;
            }
        },  
        obtenerNovedadesSinCubrir( fecha: Date):string[] {
            
            const turnosSinCubrir:string[] =  [];
            this.novedades.forEach((novedad :Novedad) => {
                const { fechaBaja, fechaAlta, HNA, novedadInactiva } = novedad;
                if (!novedadInactiva &&
                    (HNA && this.esFechaMayorIgual( this.today.toString(),fechaBaja) || 
                    this.esFechaMayorIgual( this.today.toString(),fechaBaja) && 
                    this.esFechaMayorIgual(fechaAlta, this.today.toString()))) {
                        
                        if (novedad.remplazo && novedad.remplazo.length > 0) {
                            const remplazo = novedad.remplazo.find((remp:Remplazo) =>
                                remp && (this.esFechaMayorIgual(fecha.toString(),remp.inicioRelevo)  &&
                                (remp.finRelevo || this.esFechaMayorIgual(remp.finRelevo,fecha.toString())))
                            );
                            if (!remplazo) {
                                turnosSinCubrir.push(`${novedad.turno}.${this.obtenerDiaLaboral(novedad.franco)}`) ;
                            } 
                        } else{
                            turnosSinCubrir.push(`${novedad.turno}.${this.obtenerDiaLaboral(novedad.franco)}`)
                        }
                }
            });
            return turnosSinCubrir;
        }, 
        obtenerDiaLaboral(franco:string):number{
            const francoNum = this.obtenerNumeroDia(franco)
            const diaLaboral = this.dia_laboral(francoNum,this.today.getDay())
            return diaLaboral;            
        },
        obtenerNumeroDia(dia: string) {
            const diasDeLaSemana = [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ];

            // Obtén el índice del día en el array
            const indice = diasDeLaSemana.findIndex((nombre) => nombre === dia);

            // Si se encuentra, devuelve el índice (0-6); de lo contrario, devuelve -1
            return indice;
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
        esFechaMayor(dateMayor:string, dateMenor:string) {
        if(dateMayor!== undefined && dateMenor!== undefined){
            const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
            const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
            return formattedDateMayor > formattedDateMenor
        }else{
            return false;
        }
        },
        esFechaMayorIgual(dateMayor:string, dateMenor:string) {
        if(dateMayor!== undefined && dateMenor!== undefined ){
            const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
            const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
            return formattedDateMayor >= formattedDateMenor;
        }else{
            return false;
        }
        },
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
