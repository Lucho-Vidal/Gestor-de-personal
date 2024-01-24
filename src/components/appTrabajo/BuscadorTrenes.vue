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
                <details>
                    <summary>Circular:</summary>
                    <div class="my-3">
                        <h6>Aplicar circular:</h6>
                        <label class="form-check-label mx-2">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                value="Dic23"
                                checked
                                @change="buscar()"
                            />
                            Dic23
                        </label>
                        <label class="form-check-label mx-2">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                value="HD4105"
                                @change="buscar()"
                            />
                            HD4105
                        </label>
                    </div>
                </details>
            </div>

            <div class=""></div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr v-for="(ind, index) in itFiltrado" :key="index">
                        <th
                            v-for="i in ind.estaciones.length"
                            :key="i"
                            colspan="1"
                        >
                            {{ ind.estaciones[i - 1] }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ind, index) in itFiltrado" :key="index">
                        <td
                            v-for="i in ind.horarios.length"
                            :key="i"
                            class="w-10"
                        >
                            {{ ind.horarios[i - 1] }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped table-hover">
                <thead>
                    <tr v-if="indFiltrado.length != 0">
                        <th colspan="1">Ref</th>
                        <th colspan="1">Turno</th>
                        <th colspan="1">Observación</th>
                        <th colspan="2">Titular</th>
                        <th colspan="1">Toma</th>
                        <th colspan="1">Deja</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ind, index) in indFiltrado" :key="index">
                        <td class="w-10">{{ ind.vueltas[0].refer }}</td>
                        <td class="w-10">{{ ind.turno }}</td>
                        <td class="w-10">{{ ind.vueltas[0].observaciones }}</td>
                        <td colspan="2" class="w-10">{{ ind.personal }}</td>
                        <td class="w-10">{{ ind.toma }}</td>
                        <td class="w-10">{{ ind.deja }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-for="(turno, index) in turnos" :key="index" class="row">
                <h4 class="Personal col-1">{{ turno[0].turno }}</h4>
                <h4 class="col-6">{{ turno[0].personal }}</h4>
                <h5 class="col-2">Toma: {{ turno[0].toma }}</h5>
                <h5 class="col-2">Deja: {{ turno[0].deja }}</h5>
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
                    <tbody v-for="(vueltas, index) in turno" :key="index">
                        <tr
                            v-for="(vuelta, index) in vueltas.vueltas"
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

export default defineComponent({
    data() {
        return {
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
        buscarTrenItinerario(tren: string, itinerario: string) {
            return this.itinerario.filter((it) => {
                return it.itinerario == itinerario && it.tren == parseInt(tren);
            });
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
        obtenerFecha() {
            if (this.inputDate == "") {
                // Formatear la fecha en formato ISO (YYYY-MM-DD)
                const formattedDate = this.today.toISOString().split("T")[0];
                // Asignar el valor al input
                this.inputDate = formattedDate;
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
            if (this.tren !== "") {
                this.turnos = [];
                this.itFiltrado = [];
                //si no se encuentra tren no continuo con la búsqueda
                this.filtroTrenes(itinerario);
                if (this.indFiltrado.length > 0) {
                    this.filtroItinerario(itinerario);
                    this.filtroTurno(itinerario);
                    this.buscarPersonalACargo(fecha);
                } else {
                    this.filtrarPorTurno(itinerario);
                    this.filtroTurno(itinerario);
                    this.buscarPersonalACargo(fecha);
                }
            }
        },
        filtrarPorTurno(itinerario: string) {
            this.indFiltrado = [];
            this.turno.forEach((diag: ITurno) => {
                if (
                    diag.turno
                        .toLowerCase()
                        .includes(this.tren.toLowerCase()) &&
                    diag.itinerario == itinerario
                ) {
                    this.indFiltrado.push(diag);
                }
            });
        },
        filtroTrenes(itinerario: string) {
            /* Este método buscar y filtra en el array turno el tren que se desea buscar.
            guarda en el array indFiltrado el resultado (los turnos que viajan en el tren). */
            this.indFiltrado = [];
            this.turno.forEach((diag: ITurno) => {
                for (let i = 0; i < diag.vueltas.length; i++) {
                    if (
                        diag.vueltas[i].tren == parseInt(this.tren) &&
                        diag.itinerario == itinerario
                    ) {
                        this.indFiltrado.push(diag);
                    }
                }
            });
            // console.log(this.indFiltrado);
        },
        filtroItinerario(itinerario: string) {
            /* Este método buscar en el array itinerario los horarios de pasadas por cada estación
            las guarda en el array itFiltrado  */
            this.itFiltrado = this.itinerario.filter((horarios: Itinerario) => {
                return (
                    horarios.tren == parseInt(this.tren) &&
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
                            novedad.legajo === personal.legajo &&
                            (novedad.HNA ||
                                new Date(novedad.fechaAlta) >= this.today)
                        ) {
                            if (
                                novedad.remplazo !== undefined &&
                                novedad.remplazo.length > 0
                            ) {
                                let fecha =
                                    this.inputDate == ""
                                        ? new Date()
                                        : new Date(this.inputDate);

                                let remplazo = novedad.remplazo.filter(
                                    (remp) => {
                                        return (
                                            new Date(remp.inicioRelevo) <=
                                                fecha &&
                                            (new Date(remp.finRelevo) >=
                                                fecha ||
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
