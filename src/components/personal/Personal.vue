<template>
    <main>
        <NavBar />
        <div class="container">
            <h2 class="d-flex justify-content-center m-3">
                Listado Personal de Abordo
            </h2>
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
                <div class="my-2">
                    <input
                        class="col-2 gap mx-3 rounded-3"
                        type="number"
                        placeholder="Buscar Legajo"
                        autofocus
                        v-model="searchLegajo"
                        v-on:change="filtrarPersonales()"
                    />
                    <input
                        class="col-3 gap rounded"
                        type="text"
                        placeholder="Buscar por apellido y/o nombre"
                        v-model="search"
                        v-on:change="filtrarPersonales()"
                    />
                    <input
                        class="col-3 gap col"
                        type="text"
                        placeholder="Buscar por turno"
                        autofocus
                        v-model="searchTurno"
                        v-on:change="filtrarPersonales()"
                    />
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
            <h3 v-if="personalesFiltrados.length == 0">
                No se encontró ningún personal
            </h3>
            <table
                class="table table-striped table-hover"
                v-if="personalesFiltrados.length > 0"
            >
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
                        <th class="col-1">Editar</th>
                        <th class="col-1">Eliminar</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(personal, index) in personalesFiltrados"
                    :key="index"
                    @dblclick="edit(personal._id)"
                    @click="viewDetail(personal)"
                >
                    <tr>
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
                            class="material-icons cursor-hand"
                                @click="edit(personal._id)"
                            >edit_note</i>
                        </td>
                        <td class="col-1">
                            <i
                                class="material-icons cursor-hand rojo"
                                @click="deletePersonal(personal._id, index)"
                            >delete_forever</i>
                        </td>
                    </tr>
                    <tr v-if="personal.viewDetail && personal.conocimientos">
                        <td colspan="12">
                            <div class="row">
                                <h6 class="col-12">Conocimientos:</h6>
                                <p class="col-1">
                                    {{
                                        personal.conocimientos.CML === true
                                            ? "CML"
                                            : ""
                                    }}
                                    {{
                                        personal.conocimientos.CKD === true
                                            ? "CKD"
                                            : ""
                                    }}
                                    {{
                                        personal.conocimientos.RO === true
                                            ? "RO "
                                            : ""
                                    }}
                                    {{
                                        personal.conocimientos.MPN === true
                                            ? "MPN "
                                            : ""
                                    }}
                                    {{
                                        personal.conocimientos.OL === true
                                            ? "OL "
                                            : ""
                                    }}
                                    {{
                                        personal.conocimientos.LCI === true
                                            ? "LCI "
                                            : ""
                                    }}
                                    {{
                                        personal.conocimientos.ELEC === true
                                            ? "ELEC "
                                            : ""
                                    }}
                                    {{
                                        personal.conocimientos.DUAL === true
                                            ? "DUAL"
                                            : ""
                                    }}
                                </p>
                            </div>
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
import { deletePersonal, getPersonales } from "../../services/personalService";
import { IPersonal } from "../../interfaces/IPersonal";
import { newToken } from "../../services/signService";
import { AxiosError } from "axios";
import { createRegistro } from "../../services/registrosService";
import { Registro } from "../../interfaces/IRegistro";

export default defineComponent({
    data() {
        return {
            personales: [] as IPersonal[],
            personalesFiltrados: [] as IPersonal[],
            checkboxDotacion: [] as string[],
            checkboxEspecialidad: [] as string[],
            checkboxTurno: [] as string[],
            today: new Date(),
            search: "" as string,
            searchTurno: "" as string,
            searchLegajo: 0,
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
            try {
                const res = await getPersonales();
                this.personales = res.data;
                this.filtrarPersonales();
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        async deletePersonal(id: string, index: number) {
            try {
                const confirmacion = window.confirm(
                    "¿Estás seguro de que deseas eliminar este Personal?"
                );
                if (confirmacion) {
                    await deletePersonal(id);

                    // guardamos registro
                    const registro: Registro = {
                                usuario : window.localStorage.getItem("username")||'',
                                fecha : this.today.toString() ,
                                accion: "Elimino",
                                personal : this.personales[index],
                            }
                    await createRegistro(registro);
                    this.personalesFiltrados.splice(index, 1);
                }
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        handleRequestError(error: AxiosError) {
            console.error("Error en la solicitud:", error);

            if (error.response && error.response.status === 401) {
                // Manejar la lógica de redirección a la página de inicio de sesión
                localStorage.removeItem("username")
                localStorage.removeItem("roles")
                localStorage.removeItem("token")
                this.$router.push("/login");
            } else {
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        viewDetail(personal: IPersonal) {
            if (personal.viewDetail) {
                personal.viewDetail = false;
            } else {
                personal.viewDetail = true;
            }
        },
        filtrarPersonales() {
            let cDotacion = [];
            let cEspecialidad = [];
            let cTurno = [];
            let filtrar = false;
            this.personalesFiltrados = [];

            if (this.search.length != 0) {
                filtrar = true;
            }
            if (this.searchLegajo != 0) {
                filtrar = true;
            }
            if (this.searchTurno.length != 0) {
                filtrar = true;
            }
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
                        if (auxPersonales[i] != undefined) {
                            if (
                                turno.toLowerCase().includes("ciclo") &&
                                auxPersonales[i].turno
                                    .toLowerCase()
                                    .includes("ciclo")
                            ) {
                                this.personalesFiltrados.push(auxPersonales[i]);
                            } else if (
                                turno.toLowerCase().includes("prog") &&
                                auxPersonales[i].turno
                                    .toLowerCase()
                                    .includes("prog")
                            ) {
                                this.personalesFiltrados.push(auxPersonales[i]);
                            } else if (
                                turno.toLowerCase().includes("turno") &&
                                !auxPersonales[i].turno
                                    .toLowerCase()
                                    .includes("prog") &&
                                !auxPersonales[i].turno
                                    .toLowerCase()
                                    .includes("ciclo")
                            ) {
                                this.personalesFiltrados.push(auxPersonales[i]);
                            }
                        }
                    }
                });

                if (this.search.length != 0) {
                    auxPersonales = this.personalesFiltrados;
                    this.personalesFiltrados = auxPersonales.filter(
                        (personal) => {
                            return (
                                personal.apellido.toLowerCase() +
                                " " +
                                personal.nombres.toLowerCase().trim()
                            ).includes(this.search.toLowerCase().trim());
                        }
                    );
                }
                if (this.searchTurno.length != 0) {
                    auxPersonales = this.personalesFiltrados;
                    this.personalesFiltrados = auxPersonales.filter(
                        (personal) => {
                            return (
                                personal.turno
                            ).includes(this.searchTurno.toLowerCase().trim());
                        }
                    );
                }
                if (this.searchLegajo != 0) {
                    auxPersonales = this.personalesFiltrados;
                    this.personalesFiltrados = auxPersonales.filter(
                        (personal) => {
                            return personal.legajo === this.searchLegajo;
                        }
                    );
                }
            } else {
                this.personalesFiltrados = this.personales;
            }
        },
        edit(id: string) {
            this.$router.push(`/editPersonal/${id}`);
        },
    },
    created() {
        try {
            this.loadPersonales();
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
.cursor-hand{
    cursor: pointer;
}
.verde{
    color:#0f0
}
.rojo{
    color:#f00
}
.gris{
    color:#aaa
}
</style>
