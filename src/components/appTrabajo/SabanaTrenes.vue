<template>
    <div>
        <NavBar />
        <main class="container">
            <h2 class="d-flex justify-content-center m-3">Sabana de Trenes</h2>
            <input class="col-3" type="date" v-model="inputDate" v-on:change="buscar()" />
            <!-- <h3 v-if="novedadesFiltradas.length == 0">
                No se encontró ninguna novedad con los requerimientos
                especificados.
            </h3> -->

            <div class="d-flex row">
                <ul class="nav nav-tabs">
                    <li class="nav item">
                        <a class="nav-link " :class="[currentTab ? '':'active']" href="#" @click="cambiarPestaña()">Sabana descendente</a>
                    </li>
                    <li class="nav item">
                        <a class="nav-link " :class="[currentTab ? 'active':'']" href="#" @click="cambiarPestaña()">Sabana ascendente</a>
                    </li>
                </ul>
                
            </div>
            
            <table v-if="!currentTab" class="col-6 table table-striped table-hover">
                    <thead>
                        <tr>
                            <th class="" colspan="1" rowspan="2">Tren</th>
                            <th class="" colspan="1" rowspan="2">Desde</th>
                            <th class="" colspan="1" rowspan="2">Hasta</th>
                            <th class="" colspan="1" rowspan="2">LLega</th>
                            <th class="" colspan="5" rowspan="1">Conductor</th>
                            <th class="" colspan="5" rowspan="1">Guarda</th>
                        </tr>
                        <tr>
                            <!-- Conductor -->
                            <th class="" colspan="1" rowspan="1">Turno</th>
                            <th class="" colspan="1" rowspan="1">Nombre</th>
                            <th class="" colspan="1" rowspan="1">Sale</th>
                            <th class="" colspan="1" rowspan="1">Hora</th>
                            <th class="" colspan="1" rowspan="1">Observación</th>
                            <!-- Guarda -->
                            <th class="" colspan="1" rowspan="1">Turno</th>
                            <th class="" colspan="1" rowspan="1">Nombre</th>
                            <th class="" colspan="1" rowspan="1">Sale</th>
                            <th class="" colspan="1" rowspan="1">Hora</th>
                            <th class="" colspan="1" rowspan="1">Observación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="Small shadow">
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                        </tr>
                    </tbody>
                </table>
                <table v-if="currentTab" class="col-6 table table-striped table-hover">
                    <thead>
                        <tr>
                            <th class="" colspan="1" rowspan="2">Tren</th>
                            <th class="" colspan="1" rowspan="2">Sale</th>
                            <th class="" colspan="1" rowspan="2">Origen</th>
                            <th class="" colspan="1" rowspan="2">Destino</th>
                            <th class="" colspan="2" rowspan="1">Para tren</th>
                            <th class="" colspan="4" rowspan="1">Conductor</th>
                            <th class="" colspan="4" rowspan="1">Guarda</th>
                        </tr>
                        <tr>
                            <th class="" colspan="1" rowspan="1" >Hora en</th>
                            <!-- Conductor -->
                            <th class="" colspan="1" rowspan="1">Turno</th>
                            <th class="" colspan="1" rowspan="1">Nombre</th>
                            <th class="" colspan="1" rowspan="1">Llega con</th>
                            <th class="" colspan="1" rowspan="1">Relevo</th>
                            <!-- Guarda -->
                            <th class="" colspan="1" rowspan="1">Turno</th>
                            <th class="" colspan="1" rowspan="1">Nombre</th>
                            <th class="" colspan="1" rowspan="1">Llega con</th>
                            <th class="" colspan="1" rowspan="1">Relevo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="Small shadow">
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                            <td class="col-1"></td>
                        </tr>
                    </tbody>
                </table>
            
        </main>
        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import { getTurnos } from "../../services/turnosService";
import { ITurno } from "../../interfaces/ITurno";
import FooterPage from "../FooterPage.vue";
import { Itinerario } from '../../interfaces/Itinerario';
import { getItinerario } from "../../services/itinerarioService";
import { IPersonal } from "../../interfaces/IPersonal";
import { getPersonales } from "../../services/personalService";
import { Novedad } from "../../interfaces/INovedades";
import { getNovedades } from "../../services/novedadesService";
import { newToken } from "../../services/signService";
import { Descendente, Ascendente } from '../../interfaces/ISabana';

export default defineComponent({
    data() {
        return {
            currentTab: false,
            Descendente: {} as Descendente,
            ascendente: {} as Ascendente,
            descendentes: [] as Descendente[],  
            ascendentes: [] as Ascendente[],



            tren: "" as string,
            turno: [] as ITurno[],
            indFiltrado: [] as ITurno[],
            turnos: [] as Array<ITurno[]>,
            itinerario: [] as Itinerario[],
            itFiltrado: [] as Itinerario[],
            personales: [] as IPersonal[],
            today: new Date(),
            novedades: [] as Novedad[],
            inputDate: "" as string,
            days: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ],
        };
    },
    methods: {
        async loadTurnos() {
            /* Trae todos los elementos de la base de datos  */
            const res = await getTurnos();
            this.turno = res.data;
        },
        async loadItinerario() {
            /* Trae todos los elementos de la base de datos */
            const res = await getItinerario();
            this.itinerario = res.data;
        },
        async loadPersonales() {
            /* Trae todos los elementos de la base de datos */
            const res = await getPersonales();
            this.personales = res.data;
        },
        async loadNovedades() {
            const res = await getNovedades();
            this.novedades = res.data;
        },
        cambiarPestaña() {
            this.currentTab = !this.currentTab;            
        },
        cargarTrenDescendente(tren:string){
            const fecha: Date = this.obtenerFecha();
            const itinerario: string = this.itinerarioType(fecha);
            console.log(itinerario);
            
            //cargo la vuelta en this.indFiltrado
            this.filtroTrenes(itinerario,this.tren);
            //cargamos los turnos en this.turnos
            this.filtroTurno(itinerario);
            //buscamos personal
            this.buscarPersonalACargo(fecha);
            let trenIt = this.buscarTrenItinerario(tren,itinerario);
            console.log(trenIt);
            
            this.Descendente.tren = tren;
            //this.Descendente.desde = 


            
        },
        buscarTrenItinerario(tren:string,itinerario:string ){
            console.log(tren,itinerario,this.itinerario);
            
            return this.itinerario.filter(it => {
                return (it.itinerario == itinerario && it.tren == parseInt(tren))
            })
        },
        itinerarioType(fecha:Date){
            if (fecha.getDay() === 0) {
                return "D";
            } else if (fecha.getDay() === 6) {
                return "S";
            } else {
                return "H";
            }
        },
        obtenerFecha(){
            if (this.inputDate == "") {
                return this.today;
            } else {
                return new Date(this.inputDate + " 12:00");
            }
        },
        buscar() {
            /* Ejecuta en cada búsqueda todos los métodos necesarios. 
            Se ejecuta por v-on:change en el input  */
            const fecha: Date = this.obtenerFecha();
            const itinerario: string = this.itinerarioType(fecha);
            //reinicio variables globales
            this.turnos = [];
            this.itFiltrado = [];

            //si no se encuentra tren busco turnos
            this.filtroTrenes(itinerario,this.tren);
            if (this.indFiltrado.length > 0) {
                this.filtroItinerario(itinerario,this.tren);
                this.filtroTurno(itinerario);
                this.buscarPersonalACargo(fecha);
            } else {
                this.filtrarPorTurno(itinerario,this.tren);
                this.filtroTurno(itinerario);
                this.buscarPersonalACargo(fecha);
            }
        },
        filtrarPorTurno(itinerario: string,tren: string) {
            this.indFiltrado = [];
            this.turno.forEach((diag: ITurno) => {
                if (
                    diag.turno
                        .toLowerCase()
                        .includes(tren.toLowerCase()) &&
                    diag.itinerario == itinerario
                ) {
                    this.indFiltrado.push(diag);
                }
            });
        },
        filtroTrenes(itinerario: string,tren: string) {
            /* Este método buscar y filtra en el array turno el tren que se desea buscar.
            guarda en el array indFiltrado el resultado (los turnos que viajan en el tren). */
            this.indFiltrado = [];
            this.turno.forEach((diag: ITurno) => {
                for (let i = 0; i < diag.vueltas.length; i++) {
                    if (
                        diag.vueltas[i].tren == parseInt(tren) &&
                        diag.itinerario == itinerario
                    ) {
                        this.indFiltrado.push(diag);
                    }
                }
            });
            // console.log(this.indFiltrado);
        },
        filtroItinerario(itinerario: string,tren: string) {
            /* Este método buscar en el array itinerario los horarios de pasadas por cada estación
            las guarda en el array itFiltrado  */
            this.itFiltrado = this.itinerario.filter((horarios: Itinerario) => {
                return (
                    horarios.tren == parseInt(tren) &&
                    horarios.itinerario == itinerario
                );
            });
            try {
                if (this.itFiltrado[0].tren % 2 == 0) {
                    this.itFiltrado[0].estaciones.reverse();
                    this.itFiltrado[0].horarios.reverse();
                }
            } catch (e) {
                console.error(e);
            }
        },
        filtroTurno(itinerario: string) {
            /* Este método es el encargado de buscar los turnos en cada búsqueda.
            Primero limpia el array turnos y luego asigna todas las vueltas de cada turno*/
            this.indFiltrado.forEach((turno: ITurno) => {
                this.turnos.push(
                    this.turno.filter((ind: ITurno) => {
                        return (
                            ind.turno.includes(turno.turno) &&
                            ind.itinerario == itinerario
                        );
                    })
                );
            });
        },
        buscarPersonalACargo(fecha: Date) {
            /* Este método es el encargado de buscar y cambiar el nombre del personal en cada búsqueda. 
            El método busca en el array turnos utilizando la función filtroPersonal, el resultado lo 
            guarda en un nuevo array llamado list para luego buscar y modificar el nombre del personal en 
            el array indFiltrado y posterior en el mismo array turnos. */
            let list = [];

            //   busco el personal titular
            list.push(
                this.turnos.map((turno: ITurno[]) => {
                    return this.filtroPersonal(turno[0].turno, fecha);
                })
            );
            try {
                list[0].forEach((personal) => {
                    this.novedades.forEach((novedad) => {
                        //si tiene novedad cargada y vigente se cambia por el remplazo si tiene sino sin cubrir
                        if (
                            novedad.legajo == personal.legajo &&
                            novedad.HNA &&
                            new Date(novedad.fechaBaja) <= this.today
                        ) {
                            if (
                                novedad.remplazo != undefined &&
                                novedad.remplazo.length > 0
                            ) {
                                let remplazo = novedad.remplazo.filter(
                                    (remp) => {
                                        return (
                                            new Date(remp.inicioRelevo) <=
                                                new Date(this.inputDate) &&
                                            (new Date(remp.finRelevo) >=
                                                new Date(this.inputDate) ||
                                                remp.finRelevo == undefined)
                                        );
                                    }
                                );

                                if (remplazo.length > 0) {
                                    personal.legajo = remplazo[0].legajo;
                                    personal.nombres =
                                        remplazo[0].apellido +
                                        " " +
                                        remplazo[0].nombres;
                                } else {
                                    //si el personal asignado no es para la fecha
                                    personal.nombres = "Sin Cubrir";
                                }
                            } else {
                                //si no hay personal asignado
                                personal.nombres = "Sin Cubrir";
                            }
                        }

                        //asigno personal al array indFiltrado
                        this.indFiltrado.forEach((vuelta: ITurno) => {
                            if (vuelta.turno.trim() === personal.turno) {
                                vuelta.personal = personal.nombres;
                            }
                        });
                    });
                });
            } catch (e) {
                console.error(e);
            }
        },
        dia_laboral(diaLaboral: number, hoy: number) {
            /*   # devuelve el día de la semana como un número entero donde el Domingo 
            está indexado como 0 y el Sábado como 6
            Al ingresarle por parámetros la cantidad de días del turno pos franco y 
            el dia de la semana actual devuelve el dia del franco del turno mismo. */
            let diagrama = [
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
        filtroPersonal(turno: string, fecha: Date) {
            /* Recibe por parámetro un turno ej:405.5 en caso que sea un diagrama de 7 días
            o 428 en caso de unipersonal. Según el caso separa por el punto el turno de la jornada pos franco
            y devuelve un objeto con las llaves:turno y nombres  */

            try {
                let titular = [];
                turno = turno.trim();

                if (
                    turno.indexOf(".") != -1 &&
                    !turno.toLowerCase().includes("PROG".toLowerCase())
                ) {
                    const indexPunto = turno.indexOf(".");
                    const diaLab = Number(turno[indexPunto + 1]);
                    const diag = turno.split(".")[0];
                    const franco = this.dia_laboral(diaLab, fecha.getDay());
                    titular = this.personales.filter((p) => {
                        return p.turno == diag && Number(p.franco) == franco;
                    });
                } else {
                    titular = this.personales.filter(
                        (p) => p.turno.toLowerCase() == turno.toLowerCase()
                    );
                }
                return {
                    turno: turno,
                    legajo: titular[0].legajo,
                    nombres: titular[0].apellido + " " + titular[0].nombres,
                };
            } catch (e) {
                console.error(e);
                return {};
            }
        },
        changeDate() {
            this.today = new Date(this.inputDate + " 12:00");
        },
    },
    mounted() {
        this.loadTurnos();
        this.loadItinerario();
        this.loadPersonales();
        this.loadNovedades();
        this.today.setHours(12, 0, 0, 0);
        newToken();
        this.cargarTrenDescendente('5555')
    },
    computed: {},
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
.Personal {
    background: #000;
    width: 150px;
    border-top: #000;
    color: #fff;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    border-radius: 0.5rem;
}
</style>
