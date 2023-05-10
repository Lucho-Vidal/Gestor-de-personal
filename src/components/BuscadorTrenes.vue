<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Buscador de trenes
            </h1>
            <div class="d-flex row">
                <div class="row justify-content-end">
                    <p class="col ">
                    Fecha: {{ days[today.getDay()] }}
                    {{ today.toLocaleDateString() }}
                    </p>
                </div>
                <div class="row justify-content-between">
                    <input
                        class="col-3  "
                        type="text"
                        placeholder="Buscar Tren"
                        autofocus
                        v-model="tren"
                        v-on:change="buscar()"
                    />
                    <input
                        class="col-3 "
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
                        <td class="w-10">{{ ind.diagrama.refer }}</td>
                        <td class="w-10">{{ ind.turno }}</td>
                        <td class="w-10">{{ ind.diagrama.observaciones }}</td>
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
                        <td class="w-10">{{ vuelta.diagrama.vuelta }}</td>
                        <td class="w-40">{{ vuelta.diagrama.refer }}</td>
                        <td class="w-10">{{ vuelta.diagrama.tren }}</td>
                        <td class="w-10">{{ vuelta.diagrama.origen }}</td>
                        <td class="w-10">{{ vuelta.diagrama.sale }}</td>
                        <td class="w-10">{{ vuelta.diagrama.destino }}</td>
                        <td class="w-10">{{ vuelta.diagrama.llega }}</td>
                        <td class="w-20">
                            {{ vuelta.diagrama.observaciones }}
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
import { getIndice } from "../services/indicesService";
import { Indice } from "../interfaces/Indice";
import FooterPage from "./FooterPage.vue";
import { Itinerario } from "../interfaces/Itinerario";
import { getItinerario } from "../services/itinerarioService";
import { IConductor } from "../interfaces/IConductores";
import { getConductor } from "../services/personalService";

export default defineComponent({
    data() {
        return {
            tren: "" as string,
            indice: [] as Indice[],
            indFiltrado: [] as Indice[],
            turnos: [] as Array<Indice[]>,
            itinerario: [] as Itinerario[],
            itFiltrado: [] as Itinerario[],
            personales: [] as IConductor[],
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
            const res = await getIndice();
            this.indice = res.data;
        },
        async loadItinerario() {
            const res = await getItinerario();
            this.itinerario = res.data;
        },
        async loadPersonales() {
            const res = await getConductor();
            this.personales = res.data;
        },
        buscar() {
            this.filtroTrenes();
            this.filtroItinerario();
        },
        filtroTrenes() {
            this.indFiltrado = this.indice.filter((ind: Indice) => {
                return ind.diagrama.tren == parseInt(this.tren);
            });
        },
        filtroItinerario() {
            this.itFiltrado = this.itinerario.filter((horarios: Itinerario) => {
                return horarios.tren == parseInt(this.tren);
            });
            this.filtroTurno();
        },
        filtroTurno() {
            this.turnos = [];
            this.indFiltrado.forEach((turno: Indice) => {
                this.turnos.push(
                    this.indice.filter((ind: Indice) => {
                        return ind.turno == turno.turno;
                    })
                );
            });
            this.buscarPersonalACargo();
        },
        buscarPersonalACargo() {
            let list = [];
            list.push(
                this.turnos.map((turno: Indice[]) => {
                    return this.filtroPersonal(turno[0].turno);
                })
            );
            list[0].forEach((personal) => {
                this.indFiltrado.forEach((vuelta: Indice) => {
                    if (vuelta.turno == personal.turno) {
                        vuelta.personal = personal.nombres;
                    }
                });
            });
            list[0].forEach((personal) => {
                this.turnos.forEach((turno: Indice[]) => {
                    if (turno[0].turno == personal.turno) {
                        turno[0].personal = personal.nombres;
                    }
                });
            });
            console.log("DEBUG1", this.turnos);
            console.log("DEBUG2", this.indFiltrado);
        },
        dia_laboral(diaLaboral: number, hoy: number) {
            //  # devuelve el día de la semana como un número entero donde el Domingo está indexado como 0 y el Sábado como 6
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
        changeDate(){
            this.today = new Date(this.inputDate+' 12:00');
        }
    },
    mounted() {
        this.loadIndices();
        this.loadItinerario();
        this.loadPersonales();
    },
    computed: {
    },
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
