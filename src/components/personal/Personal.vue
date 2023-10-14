<template>
    <main>
        <NavBar />
        <div class="container">
            <h1 class="d-flex justify-content-center m-3">
                Listado Personal de Abordo
            </h1>
            <p class="d-flex justify-content-end m-2">
                Fecha: {{ days[today.getDay()] }}
                {{ today.toLocaleDateString() }}
            </p>
            <div class="d-flex">
                <a class="btn btn-primary d-flex end" href="/newPersonal"
                    >Nuevo Personal</a
                >
            </div>
            <details>
                <summary>Filtros:</summary>
                <div class="my-3">
                    <h6>Filtro por Dotación:</h6>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="PC"
                            v-model="checkboxDotacion"
                            @change="filtrarPersonales()"
                        />
                        PC
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="LLV"
                            v-model="checkboxDotacion"
                            @change="filtrarPersonales()"
                        />
                        LLV
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="TY"
                            v-model="checkboxDotacion"
                            @change="filtrarPersonales()"
                        />
                        TY
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="LP"
                            v-model="checkboxDotacion"
                            @change="filtrarPersonales()"
                        />
                        LP
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="K5"
                            v-model="checkboxDotacion"
                            @change="filtrarPersonales()"
                        />
                        K5
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="RE"
                            v-model="checkboxDotacion"
                            @change="filtrarPersonales()"
                        />
                        RE
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="CÑ"
                            v-model="checkboxDotacion"
                            @change="filtrarPersonales()"
                        />
                        CÑ
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="AK"
                            v-model="checkboxDotacion"
                            @change="filtrarPersonales()"
                        />
                        AK
                    </label>
                </div>

                <div class="my-3">
                    <h6>Filtro por Especialidad:</h6>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="Conductor electrico"
                            v-model="checkboxEspecialidad"
                            @change="filtrarPersonales()"
                        />
                        Conductor eléctrico
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="Conductor diesel"
                            v-model="checkboxEspecialidad"
                            @change="filtrarPersonales()"
                        />
                        Conductor Diesel
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="Ayudante habilitado"
                            v-model="checkboxEspecialidad"
                            @change="filtrarPersonales()"
                        />
                        Ayudante Habilitado
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="Ayudante conductor"
                            v-model="checkboxEspecialidad"
                            @change="filtrarPersonales()"
                        />
                        Ayudante Conductor
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="Guardatren electrico"
                            v-model="checkboxEspecialidad"
                            @change="filtrarPersonales()"
                        />
                        Guarda Tren Electrico
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="Guardatren diesel"
                            v-model="checkboxEspecialidad"
                            @change="filtrarPersonales()"
                        />
                        Guarda Tren Diesel
                    </label>
                </div>
                <div class="my-3">
                    <h6>Filtro por Turno:</h6>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="turno"
                            v-model="checkboxTurno"
                            @change="filtrarPersonales()"
                        />
                        Turnos
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="PROG"
                            v-model="checkboxTurno"
                            @change="filtrarPersonales()"
                        />
                        Programas
                    </label>
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value="ciclo"
                            v-model="checkboxTurno"
                            @change="filtrarPersonales()"
                        />
                        Ciclos
                    </label>
                </div>
            </details>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">legajo</th>
                        <th class="col-1" colspan="1">Apellido</th>
                        <th class="col-1" colspan="1">Nombres</th>
                        <th class="col-1" colspan="1">Turno</th>
                        <th class="col-1" colspan="1">Franco</th>
                        <th class="col-1" colspan="1">Especialidad</th>
                        <th class="col-1" colspan="1">Dotacion</th>
                        <th class="col-1" colspan="1">Observaciones</th>
                        <th class="col-1" colspan="1">Orden</th>
                        <th class="col-1">Ver</th>
                        <th class="col-1">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(personal, index) in personalesFiltrados"
                        :key="index"
                        @dblclick="view()"
                    >
                        <td class="col-1">{{ personal.legajo }}</td>
                        <td class="col-1">{{ personal.apellido }}</td>
                        <td class="col-2">{{ personal.nombres }}</td>
                        <td class="col-1">{{ personal.turno }}</td>
                        <td class="col-1">{{ days[personal.franco] }}</td>
                        <td class="col-1">{{ personal.especialidad }}</td>
                        <td class="col-1">{{ personal.dotacion }}</td>
                        <td class="col-2">{{ personal.observaciones }}</td>
                        <td class="col-1">{{ personal.orden }}</td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-folder-open"
                                @click="view()"
                            ></i>
                        </td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-pen-to-square"
                                @click="edit()"
                            ></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <FooterPage />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { getPersonales } from "../../services/personalService";
import { IPersonal } from "../../interfaces/IPersonal";

export default defineComponent({
    data() {
        return {
            personales: [] as IPersonal[],
            personalesFiltrados: [] as IPersonal[],
            checkboxDotacion: [] as string[],
            checkboxEspecialidad: [] as string[],
            checkboxTurno: [] as string[],
            today: new Date(),
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
        async loadPersonales() {
            const res = await getPersonales();
            this.personales = res.data;
            this.filtrarPersonales();
        },
        filtrarPersonales() {
            /* let keys = Object.entries(this.checkboxTurno).forEach(([key, value]) => console.log(key, value));
            console.log(keys); */

            let cDotacion = [];
            let cEspecialidad = [];
            let cTurno = [];
            let filtrar = false;
            this.personalesFiltrados = [];

            if (
                this.checkboxDotacion.length == 0 ||
                this.checkboxDotacion == undefined
            ) {
                cDotacion = ["PC", "LLV", "TY", "LP", "K5", "RE", "CÑ", "AK"];
            } else {
                cDotacion = this.checkboxDotacion;
                filtrar = true;
            }
            if (this.checkboxEspecialidad.length == 0) {
                cEspecialidad = [
                    "Conductor electrico",
                    "Conductor diesel",
                    "Ayudante habilitado",
                    "Guardatren diesel",
                    "Ayudante conductor",
                    "Guardatren electrico",
                ];
            } else {
                cEspecialidad = this.checkboxEspecialidad;
                filtrar = true;
            }
            if (this.checkboxTurno.length == 0) {
                cTurno = ["turno", "prog", "ciclo"];
            } else {
                cTurno = this.checkboxTurno;
                filtrar = true;
            }

            if (filtrar) {
                cDotacion.forEach((dotacion: string) => {
                    for (let i = 0; i < this.personales.length; i++) {
                        if (this.personales[i].dotacion == dotacion) {
                            this.personalesFiltrados.push(this.personales[i]);
                        }
                    }
                });

                let auxPersonales: IPersonal[] = this.personalesFiltrados;
                this.personalesFiltrados = [];

                cEspecialidad.forEach((especialidad: string) => {
                    for (let i = 0; i < auxPersonales.length; i++) {
                        if (auxPersonales[i].especialidad == especialidad) {
                            this.personalesFiltrados.push(auxPersonales[i]);
                        }
                    }
                });

                auxPersonales = this.personalesFiltrados;
                this.personalesFiltrados = [];

                cTurno.forEach((turno: string) => {
                    for (let i = 0; i < this.personales.length; i++) {
                        
                        if (auxPersonales[i] != undefined ){
                            if (turno.toLowerCase().includes("ciclo") && auxPersonales[i].turno.toLowerCase().includes("ciclo")){
                                this.personalesFiltrados.push(auxPersonales[i]);
                        
                            }else if(turno.toLowerCase().includes("prog") && auxPersonales[i].turno.toLowerCase().includes("prog")){
                                this.personalesFiltrados.push(auxPersonales[i]);
                            }else if(turno.toLowerCase().includes("turno") && !auxPersonales[i].turno.toLowerCase().includes("prog") && !auxPersonales[i].turno.toLowerCase().includes("ciclo")){
                                this.personalesFiltrados.push(auxPersonales[i]);
                            }
                    }
                }
                });
                /* this.personalesFiltrados.sort((a, b) => {
                    if (a.orden > b.orden) {
                        return 1;
                    }
                    if (a.orden < b.orden && a.dotacion == b.dotacion) {
                        return -1;
                    }
                    return 0;
                }); */
            }else{
                this.personalesFiltrados = this.personales;
            }

        },

        view() {
            console.log();
        },
        edit() {
            console.log("hola desde Edit");
        },
    },
    mounted() {
        this.loadPersonales();
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
</style>
