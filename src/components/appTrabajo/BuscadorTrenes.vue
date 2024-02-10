<template>
    <div>
        <NavBar />
        <main class="container">
            <h2 class="d-flex justify-content-center m-3">
                Buscador de trenes
            </h2>
            <div class="d-flex row">
                <div class="row justify-content-end">
                    <!-- <p class="col">
                        Fecha: {{ days[today.getDay()] }}
                        {{ today.toLocaleDateString() }}
                    </p> -->
                </div>
                <div class="row justify-content-between">
                    <input
                        class="col-3"
                        type="text"
                        placeholder="Buscar por tren o por turno"
                        autofocus
                        v-model="tren"
                        v-on:change="buscar()"
                    />
                    <select
                        name="itinerario"
                        id="itinerario"
                        class="col-2"
                        required
                        v-model="inputIt"
                        v-on:change="buscar()"
                    >
                        <option value=""></option>
                        <option value="H">Hábil</option>
                        <option value="S">Sábado</option>
                        <option value="D">Domingo</option>
                    </select>
                    <input
                        class="col-3"
                        type="date"
                        v-model="inputDate"
                        v-on:change="buscar()"
                    />
                </div>

                <div class="d-flex flex-wrap my-3">
                    <h6>Aplicar circular:</h6>
                    <div v-for="(circular, index) in circulares" :key="index">
                        <label class="form-check-label mx-2">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                :value="circular"
                                v-model="circularSeleccionada"
                                v-on:change="cambioCirculares()"
                            />
                            {{ circular }}
                            <!-- Mostrar el valor de la variable circular en el label -->
                        </label>
                    </div>
                </div>
            </div>

            <div class=""></div>
            <table class="table table-striped table-hover">
                <thead v-if="horarios !== null">
                    <tr v-if="horarios.estaciones !== undefined">
                        <th
                            v-for="i in horarios.estaciones.length"
                            :key="i"
                            colspan="1"
                        >
                            {{ horarios.estaciones[i - 1] }}
                        </th>
                    </tr>
                </thead>
                <tbody v-if="horarios !== null" >
                    <tr v-if="horarios.horarios !== undefined">
                        <th
                            v-for="i in horarios.horarios.length"
                            :key="i"
                            colspan="1"
                        >
                            {{ horarios.horarios[i - 1] }}
                        </th>
                    </tr>
                </tbody>
            </table>
            <table v-if="turnosAImprimir !== null" class="table table-striped table-hover">
                <thead>
                    <tr v-if="turnosAImprimir.length != 0">
                        <th colspan="1">Ref</th>
                        <th colspan="1">Turno</th>
                        <th colspan="1">Circular</th>
                        <th colspan="1">Observación</th>
                        <th colspan="2">Titular</th>
                        <th colspan="1">Toma</th>
                        <th colspan="1">Deja</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ind, index) in turnosAImprimir" :key="index">
                        <td class="w-10">{{ ind.vueltas[0].refer }}</td>
                        <td class="w-10">{{ ind.turno }}</td>
                        <td class="w-10">{{ ind.circular }}</td>
                        <td class="w-10">{{ ind.vueltas[0].observaciones }}</td>
                        <td colspan="2" class="w-10">{{ ind.personal }}</td>
                        <td class="w-10">{{ ind.toma }}</td>
                        <td class="w-10">{{ ind.deja }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-for="(t, tIndex) in turnosAImprimir" :key="tIndex" class="row">
                    <h4 class="Personal col-1">{{ t.turno }}</h4>
                    <h4 class="col-4">{{ t.personal }}</h4>
                    <h5 class="col-2">{{ "<<" + t.circular + ">>" }}</h5>
                    <h5 class="col-2">Toma: {{ t.toma }}</h5>
                    <h5 class="col-2">Deja: {{ t.deja }}</h5>
                    <table class="table table-striped table-hover">
                        <thead class="">
                            <tr>
                                <th colspan="1">Vuelta</th>
                                <th colspan="1">Ref</th>
                                <th colspan="1">Tren</th>
                                <th colspan="1">Origen</th>
                                <th colspan="1">Sale</th>
                                <th colspan="1">Destino</th>
                                <th colspan="1">Llega</th>
                                <th colspan="1">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(vuelta, index) in t.vueltas"
                                :key="index"
                            >
                                <td class="col-3">{{ vuelta.vuelta }}</td>
                                <td class="col-1">{{ vuelta.refer }}</td>
                                <td class="col-1">{{ vuelta.tren }}</td>
                                <td class="col-1">{{ vuelta.origen }}</td>
                                <td class="col-1">{{ vuelta.sale }}</td>
                                <td class="col-1">{{ vuelta.destino }}</td>
                                <td class="col-1">{{ vuelta.llega }}</td>
                                <td class="col-3">
                                    {{ vuelta.observaciones }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
import { Itinerario } from "../../interfaces/Itinerario";
import { getItinerario } from "../../services/itinerarioService";
import { IPersonal } from "../../interfaces/IPersonal";
import { getPersonales } from "../../services/personalService";
import { Novedad } from "../../interfaces/INovedades";
import { getNovedades } from "../../services/novedadesService";
import { newToken } from "../../services/signService";
import { AxiosError } from "axios";

export default defineComponent({
    data() {
        return {
            tren: "" as string,
            turno: [] as ITurno[],
            circulares: [] as string[],
            circularSeleccionada: ["Dic23"] as string[],
            turnosAImprimir: [] as ITurno[] | null,
            itinerario: [] as Itinerario[],
            horarios: {} as Itinerario | null,
            personales: [] as IPersonal[],
            today: new Date(),
            novedades: [] as Novedad[],
            inputDate: "" as string,
            inputIt: "" as string,
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
            try {
                const res = await getTurnos();
                this.turno = res.data;
                const circularSeleccionadaString = window.localStorage.getItem("circularSeleccionada");
                this.circularSeleccionada = circularSeleccionadaString ? circularSeleccionadaString.split(",") : [];
                this.circulares = this.obtenerTiposCirculares(this.turno);
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        async loadItinerario() {
            try {
                /* Trae todos los elementos de la base de datos */
                const res = await getItinerario();
                this.itinerario = res.data;
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

        buscar() {
            /* Ejecuta en cada búsqueda todos los métodos necesarios. 
            Se ejecuta por v-on:change en el input  */
            //limpio variables globales
            this.horarios = null;
            this.turnosAImprimir = null;

            const fecha: Date = this.obtenerFecha(this.inputDate, this.today );
            const itinerario: string = this.itinerarioType(fecha);

            if (this.tren !== "") {
                //si no se encuentra tren no continuo con la búsqueda
                this.turnosAImprimir = this.filtroTrenes(
                    itinerario,
                    this.turno,
                    this.circularSeleccionada,
                    parseInt(this.tren)
                );
                if (this.turnosAImprimir.length > 0) {
                    this.horarios = this.filtroItinerario(itinerario,this.itinerario,parseInt(this.tren));
                    //this.turnosAImprimir = this.filtroTurno(itinerario);
                    this.buscarPersonalACargo(fecha,this.turnosAImprimir,this.personales);
                } else {
                    this.turnosAImprimir = this.filtrarPorTurno(itinerario,this.turno,this.circularSeleccionada,this.tren);
                    //this.filtroTurno(itinerario);
                    this.buscarPersonalACargo(fecha,this.turnosAImprimir,this.personales);
                }
            }
        },
        obtenerFecha(fecha:string, today: Date) {
            if (fecha == "") {
                // Formatear la fecha en formato ISO (YYYY-MM-DD)
                const formattedDate = today.toISOString().split("T")[0];
                // Asignar el valor al input
                this.inputDate = formattedDate;
                return today;
            } else {
                return new Date(fecha + " 12:00");
            }
        },
        itinerarioType(fecha: Date) {
            if (this.inputIt === "") {
                if (fecha.getDay() === 0) {
                    this.inputIt = "D";
                    return "D";
                } else if (fecha.getDay() === 6) {
                    this.inputIt = "S";
                    return "S";
                } else {
                    this.inputIt = "H";
                    return "H";
                }
            } else {
                return this.inputIt;
            }
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
        filtroItinerario(itinerario: string, listaItinerario: Itinerario[],tren: number) {
            /* Este método buscar en el array itinerario los horarios de pasadas por cada estación
            las guarda en el array itFiltrado  */
            const itFiltrados: Itinerario[] = listaItinerario.filter(
                (it: Itinerario) => {
                    return (
                        it.tren == tren &&
                        it.itinerario == itinerario
                    );
                }
            );
            let horarios: Itinerario = {
                id: null,
                tren: 0,
                itinerario: "",
                estaciones: [],
                horarios: [],
            };
            try {
                if (itFiltrados !== undefined && itFiltrados.length === 1) {
                    horarios = itFiltrados[0];
                    if (horarios.tren % 2 == 0) {
                        horarios.estaciones.reverse();
                        horarios.horarios.reverse();
                    }
                    return horarios;
                }
            } catch (e) {
                console.error(e);
            }
            return horarios;
        },
        buscarPersonalACargo(fecha: Date, turnosAImprimir: ITurno[], personales: IPersonal[]) {
            try {
                
                turnosAImprimir.forEach((turno: ITurno) => {
                    const personal = this.filtroPersonal(turno.turno, fecha, personales);
                    
                    this.novedades.forEach((novedad) => {
                        if (novedad.legajo === personal.legajo &&
                            (novedad.HNA || new Date(novedad.fechaAlta) >= this.today)) {

                            personal.nombres = this.obtenerNombreConReemplazo(novedad, fecha);
                        }
                    });

                    // Asignar personal al array turnosAImprimir
                    if (personal.nombres !== undefined){
                        turno.personal = personal.nombres;
                    }
                });
            } catch (e) {
                console.error(e);
            }
        },
        obtenerNombreConReemplazo(novedad: Novedad, fecha: Date): string {
            if (novedad.remplazo && novedad.remplazo.length > 0) {
                const fechaActual = this.inputDate ? new Date(this.inputDate) : new Date();
                const remplazo = novedad.remplazo.find(remp =>
                    new Date(remp.inicioRelevo) <= fecha &&
                    (new Date(remp.finRelevo) >= fechaActual || remp.finRelevo === undefined)
                );

                if (remplazo) {
                    return `${remplazo.apellido} ${remplazo.nombres}`;
                } else {
                    return "Sin Cubrir";
                }
            } else {
                return "Sin Cubrir";
            }
        },
        filtroPersonal(turno: string, fecha: Date, personales: IPersonal[]) {
            try {
                let titular: IPersonal;
                let filtrados: IPersonal[];
                turno = turno.trim();

                if (turno.indexOf(".") !== -1 && !turno.toLowerCase().includes("PROG".toLowerCase())) {
                    const indexPunto = turno.indexOf(".");
                    const diaLab = Number(turno[indexPunto + 1]);
                    const diag = turno.split(".")[0];
                    const franco = this.dia_laboral(diaLab, fecha.getDay());

                    filtrados = personales.filter((personal) => {
                        return personal.turno === diag && Number(personal.franco) === franco;
                    });
                } else {
                    filtrados = personales.filter(
                        (personal) => personal.turno.toLowerCase() === turno.toLowerCase()
                    );
                }
                titular = filtrados[0];
                return {
                    turno: turno,
                    legajo: titular?.legajo || 0,
                    nombres: titular ? `${titular.apellido} ${titular.nombres}` : "",
                };
            } catch (e) {
                console.error(e);
                return {};
            }
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
        filtrarPorTurno(itinerario: string,listaTurnos:ITurno[],circularSeleccionada:string[],tren:string ) {
            let turnos: ITurno[] = []
            listaTurnos.forEach((diag: ITurno) => {
                if (
                    diag.turno
                        .toLowerCase()
                        .includes(tren.toLowerCase()) &&
                    diag.itinerario == itinerario &&
                    circularSeleccionada.includes(diag.circular)
                ) {
                    turnos.push(diag);
                }
            });
            return turnos;
        },
        obtenerTiposCirculares(turnos: ITurno[]) {
            // Filtramos aquellos turnos que tengan definida la propiedad "circular"
            const turnosFiltrados = turnos.filter(
                (turno) => turno.circular !== undefined
            );

            // Usamos Set para obtener valores únicos de la propiedad "circular"
            const circularesUnicas = [
                ...new Set(turnosFiltrados.map((turno) => turno.circular)),
            ];

            return circularesUnicas;
        },
        cambioCirculares(){

            window.localStorage.setItem("circularSeleccionada", this.circularSeleccionada.join(","));

            this.buscar()
        }
    },
    mounted() {
        try {
            this.loadTurnos();
            this.loadItinerario();
            this.loadPersonales();
            this.loadNovedades();
            this.today.setHours(12, 0, 0, 0);
            newToken();
        } catch (error) {
            console.error(error);
        }
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
