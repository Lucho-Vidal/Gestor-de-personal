<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Buscador de trenes
            </h1>
            <div class="d-flex row">
                <div class="row justify-content-end">
                    <p class="col">
                        Fecha: {{ days[today.getDay()] }}
                        {{ today.toLocaleDateString() }}
                    </p>
                </div>
                <div class="row justify-content-between">
                    <input
                        class="col-3"
                        type="text"
                        placeholder="Buscar Tren"
                        autofocus
                        v-model="tren"
                        v-on:change="buscar()"
                    />
                    <input
                        class="col-3"
                        type="date"
                        v-model="inputDate"
                        @change="changeDate"
                    />
                </div>
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
                        <td class="w-10">{{ ind.vueltas[0] }}</td>
                        <td class="w-10">{{ ind.turno }}</td>
                        <td class="w-10">{{ ind.vueltas[0].observaciones }}</td>
                        <td colspan="2" class="w-10">{{ ind.personal }}</td>
                        <td class="w-10">{{ ind.toma }}</td>
                        <td class="w-10">{{ ind.deja }}</td>
                    </tr>
                </tbody>
            </table>
            <table
                v-for="(turno, index) in turnos"
                :key="index"
                class="table table-striped table-hover"
            >
                <thead>
                    <h4>{{ turno[0].turno }} - {{ turno[0].personal }}</h4>
                    <tr>
                        <th colspan="1">ID</th>
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
                    <tr v-for="(vuelta, index) in turno" :key="index">
                        <td class="w-10">{{ vuelta.vueltas[0].vuelta }}</td>
                        <td class="w-40">{{ vuelta.vueltas[0].refer }}</td>
                        <td class="w-10">{{ vuelta.vueltas[0].tren }}</td>
                        <td class="w-10">{{ vuelta.vueltas[0].origen }}</td>
                        <td class="w-10">{{ vuelta.vueltas[0].sale }}</td>
                        <td class="w-10">{{ vuelta.vueltas[0].destino }}</td>
                        <td class="w-10">{{ vuelta.vueltas[0].llega }}</td>
                        <td class="w-20">
                            {{ vuelta.vueltas[0].observaciones }}
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
import { getTurnos } from "../services/turnosService";
import { ITurno } from "../interfaces/ITurno";
import FooterPage from "./FooterPage.vue";
import { Itinerario } from "../interfaces/Itinerario";
import { getItinerario } from "../services/itinerarioService";
import { IPersonal } from "../interfaces/IPersonal";
import { getPersonales } from "../services/personalService";

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
        async loadIndices() {
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
        buscar() {
            /* Ejecuta en cada búsqueda todos los métodos necesarios. 
            Se ejecuta por v-on:change en el input  */
            this.filtroTrenes();
            this.filtroItinerario();
            this.filtroTurno();
            this.buscarPersonalACargo();
        },
        filtroTrenes() {
            /* Este método buscar y filtra en el array indice el tren que se desea buscar.
            guarda en el array indFiltrado el resultado (los turnos que viajan en el tren). */
            this.indFiltrado = this.turno.filter((ind: ITurno) => {
                return ind.vueltas[0].tren == parseInt(this.tren);
            });
        },
        filtroItinerario() {
            /* Este método buscar en el array itinerario los horarios de pasadas por cada estación
            las guarda en el array itFiltrado  */
            this.itFiltrado = this.itinerario.filter((horarios: Itinerario) => {
                return horarios.tren == parseInt(this.tren);
            });
        },
        filtroTurno() {
            /* Este método es el encargado de buscar los turno en cada búsqueda.
            Primero limpia el array turnos y luego asigna todas las vueltas de cada turno*/
            this.turnos = [];
            this.indFiltrado.forEach((turno: ITurno) => {
                this.turnos.push(
                    this.turno.filter((ind: ITurno) => {
                        return ind.turno == turno.turno;
                    })
                );
            });
        },
        buscarPersonalACargo() {
            /* Este método es el encargado de buscar y cambiar el nombre del personal en cada búsqueda. 
            El método busca en el array turnos utilizando la función filtroPersonal, el resultado lo 
            guarda en un nuevo array llamado list para luego buscar y modificar el nombre del personal en 
            el array indFiltrado y posterior en el mismo array turnos. */
            let list = [];
            list.push(
                this.turnos.map((turno: ITurno[]) => {
                    return this.filtroPersonal(turno[0].turno);
                })
            );
            list[0].forEach((personal) => {
                this.indFiltrado.forEach((vuelta: ITurno) => {
                    if (vuelta.turno == personal.turno) {
                        vuelta.personal = personal.nombres;
                    }
                });
            });
            list[0].forEach((personal) => {
                this.turnos.forEach((turno: ITurno[]) => {
                    if (turno[0].turno == personal.turno) {
                        turno[0].personal = personal.nombres;
                    }
                });
            });
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
        filtroPersonal(turno: string) {
            /* Recibe por parámetro un turno ej:405.5 en caso que sea un diagrama de 7 días
            o 428 en caso de unipersonal. Según el caso separa por el punto el turno de la jornada pos franco
            y devuelve un objeto con las llaves:turno y nombres  */
            let titular = [];
            if (turno.indexOf(".") != -1 && !turno.includes("PROG")) {
                const indexPunto = turno.indexOf(".");
                const diaLab = Number(turno[indexPunto + 1]);
                const diag = turno.split(".")[0];
                const franco = this.dia_laboral(diaLab, this.today.getDay());
                titular = this.personales.filter((p) => {
                    return p.turno == diag && Number(p.franco) == franco;
                });
            } else {
                titular = this.personales.filter((p) => p.turno == turno);
            }
            return {
                turno: turno,
                nombres: titular[0].apellido + " " + titular[0].nombres,
            };
        },
        changeDate() {
            this.today = new Date(this.inputDate + " 12:00");
        },
    },
    mounted() {
        this.loadIndices();
        this.loadItinerario();
        this.loadPersonales();
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
table h4 {
    background: #000;
    color: #fff;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    border-radius: 1rem;
}
</style>
