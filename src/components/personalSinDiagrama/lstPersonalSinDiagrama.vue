<template>
    <main>
        <div class="container-fluid px-4">
            <h2 class="d-flex justify-content-end m-3">Listado personal sin diagrama</h2>

            <div class="d-flex justify-content-end">
                <label class="col-2">
                    Especialidad:
                    <select
                        name="especialidad"
                        id="especialidad"
                        class="form-control "
                        v-model="CEspecialidad"
                        required
                        @change="filtrarPersonales()"
                    >
                        <option value="Conductor Electrico"
                            >Conductor Eléctrico</option
                        >
                        <option value="Conductor Diesel"
                            >Conductor Diesel</option
                        >
                        <option value="Ayudante Habilitado"
                            >Ayudante Habilitado</option
                        >
                        <option value="Ayudante Conductor"
                            >Ayudante Conductor</option
                        >
                        <option value="Guardatren Electrico"
                            >Guardatren Eléctrico</option
                        >
                        <option value="Guardatren Diesel"
                            >Guardatren Diesel</option
                        >
                    </select>
                </label>
                <label for="dotacion" class="col-2 mx-3">
                    Dotación:
                    <select
                    name="dotacion"
                    id="dotacion"
                    class="form-control"
                    v-model="dotacionesSeleccionadas"
                    @change="filtrarPersonales()"
                    >
                    <option v-for="(dotacion, index) in dotacionesPermitidas" :key="index" :value="dotacion">
                        {{ dotacion }}
                    </option>
                    </select>
                </label>
                
                <!-- <progress value="0.99"></progress> -->
                <button class="btn btn-warning mx-5" @click.prevent="abrirModal()">
                    Filtrar Personal
                </button>
            </div>
            <!-- v-if="detalleLegajo!=0" para que no genere error -->
            
            <div class="modal" :class="{ 'd-block': mostrarModalSearch }"  @click.self="cerrarModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Filtrar personales</h5>
                            <button
                                type="button"
                                class="close btn btn-danger"
                                @click.prevent="cerrarModal"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-3 justify-content-center">
                                <div class="col-md-4">
                                    <input
                                        class="form-control rounded-3"
                                        ref="inputSearch"
                                        type="number"
                                        placeholder="Buscar Legajo"
                                        autofocus
                                        v-model="searchLegajo"
                                        @keyup.enter="handleEnterKey"
                                    />
                                </div>
                                <div class="col-md-4">
                                    <input
                                        class="form-control rounded"
                                        type="text"
                                        placeholder="Buscar por apellido y/o nombre"
                                        v-model="search"
                                        v-on:change="filtrarPersonales()"
                                        @keyup.enter="handleEnterKey"
                                    />
                                </div>
                                <div class="col-md-4">
                                    <input
                                        class="form-control col rounded"
                                        type="text"
                                        placeholder="Buscar por turno"
                                        v-model="searchTurno"
                                        v-on:change="filtrarPersonales()"
                                        @keyup.enter="handleEnterKey"
                                    />
                                </div>
                            </div>
                            <div class="mt-5 d-flex justify-content-center">
                                <button 
                                class="btn btn-primary"
                                @click="limpiarFiltro()"
                                >Limpiar Filtros y cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3 v-if="personalesFiltrados.length == 0">
                No se encontró ningún personal
            </h3>
            <table
                class="table table-striped table-hover "
                v-if="personalesFiltrados.length > 0"
            >
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">N</th>
                        <th class="col-1" colspan="1">legajo</th>
                        <th class="col-1" colspan="1">Apellido</th>
                        <th class="col-1" colspan="1">Nombres</th>
                        <th class="col-1" colspan="1">Turno</th>
                        <th class="col-1" colspan="1">Franco</th>
                        <th class="col-1" colspan="1">Especialidad</th>
                        <th class="col-1" colspan="1">Dotacion</th>
                        <th class="col-1" colspan="1">Observaciones</th>
                        <th class="col-1">Abrir</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(personal, index) in personalesFiltrados"
                    :key="index"
                    @dblclick="edit(personal._id,personalIndexadoSinDiagrama[personal.legajo]._id)"
                    @click="viewDetail(personal)"
                    :class="getColorClass(personal.especialidad)"
                >
                    <tr>
                        <td class="index-column">{{ index +1 }}</td>
                        <td class="col-1">{{ personal.legajo }}</td>
                        <td class="col-1">{{ personal.apellido }}</td>
                        <td class="col-2">{{ personal.nombres }}</td>
                        <td class="col-1">{{ personal.turno }}</td>
                        <td class="col-1">{{ personalIndexadoSinDiagrama[personal.legajo] ? 
                                                `${diaSemanaStr(personalIndexadoSinDiagrama[personal.legajo].francoInicio)} 
                                                ${personalIndexadoSinDiagrama[personal.legajo].HoraInicio}`
                                                :"-" }}</td>
                        <td class="col-1">{{ personal.especialidad }}</td>
                        <td class="col-1">{{ personal.dotacion }}</td>
                        <td class="col-2">{{ personal.observaciones }}</td>
                        <td class="col-1">
                            <i
                                class="material-icons cursor-hand"
                                @click="edit(personal._id,personalIndexadoSinDiagrama[personal.legajo]._id)"
                                >edit_note</i
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {getPersonales} from "../../services/personalService";
import { IConocimientosVias, IDatoPersonal, IPersonal } from "../../interfaces/IPersonal";
import { newToken } from "../../services/signService";
import { AxiosError } from "axios";
import { obtenerDotaciones } from '../../utils/funciones';
import { getPersonalesSinDiagrama } from "../../services/personalSinDiagramaService";
import { IPersonalSinDiagrama } from "../../interfaces/IPersonalSinDiagrama";

export default defineComponent({
    props: ['idPersonal', 'idDato', 'idVia'],
    data() {
        return {
            personales: [] as IPersonal[],
            personalesSinDiagrama: [] as IPersonalSinDiagrama[],
            personalesFiltrados: [] as IPersonal[],
            datosPersonales: [] as IDatoPersonal[],
            conocimientosVias: [] as IConocimientosVias[],
            personalIndexado: {} as Record<number, IPersonal>,
            personalIndexadoSinDiagrama: {} as Record<number, IPersonalSinDiagrama>,
            dotacionesPermitidas: [] as string[],
            dotacionesSeleccionadas: "PC" as string,
            CEspecialidad: "Conductor Electrico" as string,
            checkboxTurno: [] as string[],
            mostrarModalSearch: false,
            today: new Date(),
            search: "" as string,
            searchTurno: "" as string,
            searchLegajo: null,
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
                this.personales = this.filtrarCiclo(res.data);
                this.filtrarPersonales();
                this.personalIndexado = this.indexarPersonal(this.personales)
                this.dotacionesPermitidas = obtenerDotaciones(this.personales);

            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        async loadPersonalSinDiagrama() {
            try {
                const res = await getPersonalesSinDiagrama();
                this.personalesSinDiagrama = res.data;
                this.personalIndexadoSinDiagrama = this.indexarPersonalSinDiagrama(this.personalesSinDiagrama)
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        diaSemanaStr(dia:number):string{
            const dias =[
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ]
            return dias[dia]
        },
        edit(idPersonal: string,idTarjeta: string) {            
            this.$router.push({ name: 'TarjetaPersonalSinDiagrama', params: { idPersonal: idPersonal, idTarjeta: idTarjeta}});
        },
        filtrarCiclo(personales:IPersonal[]){
            return personales.filter((personal:IPersonal)=> personal.turno.toLowerCase().includes("ciclo"))
        },
        indexarPersonal(personales: IPersonal[]): Record<number, IPersonal> {
            return personales.reduce(
                (acumulador: Record<number, IPersonal>, personal: IPersonal) => {
                    acumulador[personal.legajo] = personal;
                    return acumulador;
                },
                {} as Record<number, IPersonal>
            );
        },
        indexarPersonalSinDiagrama(personales: IPersonalSinDiagrama[]): Record<number, IPersonalSinDiagrama> {
            return personales.reduce(
                (acumulador: Record<number, IPersonalSinDiagrama>, personal: IPersonalSinDiagrama) => {
                    acumulador[personal.legajo] = personal;
                    return acumulador;
                },
                {} as Record<number, IPersonalSinDiagrama>
            );
        },
        formatFecha(fecha: Date): string {
            const day = fecha.getDate().toString().padStart(2, '0');
            const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
            const year = fecha.getFullYear();
            return `${day}/${month}/${year}`;
        },
        formatearFecha(fechaString: string): string {
            if (fechaString) {
                const fecha: Date = new Date(fechaString);
                const opcionesDeFormato: Intl.DateTimeFormatOptions = {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                };
                const formatoFecha = new Intl.DateTimeFormat(
                    "es-AR",
                    opcionesDeFormato
                );
                return formatoFecha.format(fecha);
            } else {
                return "";
            }
        },
        handleRequestError(error: AxiosError) {
            console.error("Error en la solicitud:", error);

            if (error.response && error.response.status === 401) {
                // Manejar la lógica de redirección a la página de inicio de sesión
                localStorage.removeItem("username");
                localStorage.removeItem("roles");
                localStorage.removeItem("token");
                this.$router.push("/login");
            } else {
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        limpiarFiltro(){
            this.search = ''
            this.searchLegajo = null
            this.searchTurno = ''
            this.filtrarPersonales()
            this.cerrarModal()
        },
        abrirModal() {
            this.mostrarModalSearch = true;
            this.$nextTick(() => {
                if (this.$refs.inputSearch) {
                    (this.$refs.inputSearch as HTMLInputElement).focus();
                }
            });
        },
        cerrarModal() {
            this.mostrarModalSearch = false;
        },
        handleEnterKey() {
            this.filtrarPersonales();
            this.cerrarModal();
        },
        viewDetail(personal: IPersonal) {
            personal.viewDetail ? personal.viewDetail = false :
                personal.viewDetail = true;
        },
        ordenarPorTurno(personalList: IPersonal[]): IPersonal[] {
            return personalList.sort((a, b) => {
                const cicloA = parseInt(a.turno.split(' ')[1]);
                const cicloB = parseInt(b.turno.split(' ')[1]);

                return cicloA - cicloB;
            })
        },
        filtrarPersonales() {
            this.personalesFiltrados = [];
            let cDotacion:string[] = [this.dotacionesSeleccionadas];
            let cEspecialidad = [this.CEspecialidad];
            let auxPersonales: IPersonal[] =  this.personales;
            
            if (this.search !== "" || this.searchLegajo !== null || this.searchTurno !=="") {
                //si se busca por los input´s quiero que se incluyan todas las bases y especialidades 
                //de lo contrario las seleccionadas en los input´s 
                cDotacion = this.dotacionesPermitidas;                
                cEspecialidad = [
                    "Conductor electrico",
                    "Conductor diesel",
                    "Ayudante habilitado",
                    "Guardatren diesel",
                    "Ayudante conductor",
                    "Guardatren electrico",
                ];
                if (this.search !== "") {
                    auxPersonales = auxPersonales.filter((personal) => {
                            return (personal.apellido.toLowerCase() +" " + personal.nombres.toLowerCase().trim()
                            ).includes(this.search.toLowerCase().trim());
                        }
                    );
                }
                //Filtro por turno
                if (this.searchTurno !=="") {
                    auxPersonales = auxPersonales.filter((personal) => {
                            return personal.turno.includes(this.searchTurno.toLowerCase().trim());
                        }
                    );
                }
                //Filtro por legajo
                if (this.searchLegajo !== null) {
                    auxPersonales = auxPersonales.filter((personal) => {
                            return personal.legajo === this.searchLegajo;
                        }
                    );
                }
                this.dotacionesSeleccionadas = "";
                this.CEspecialidad = "";
            } else{
                // filtro dotacion y especialidad
                auxPersonales = auxPersonales.filter((personal:IPersonal) =>{
                    return cDotacion.includes(personal.dotacion) && 
                        cEspecialidad.includes(personal.especialidad)
                })
            }
            //Ordeno la lista
            this.personalesFiltrados = this.ordenarPorTurno(auxPersonales)
        },
        getColorClass(especialidad:string) {
            if (especialidad.includes("Ayudante")) {
                return "ayudante-clase";
            } else if (especialidad.includes("Guardatren")) {
                return "guarda-clase";
            }
            return ""; // No aplicar ninguna clase si no coincide
        },
    },
    created() {
        try {
            this.loadPersonales();
            this.loadPersonalSinDiagrama()
            newToken();
        } catch (error) {
            console.error(error);
        }
    },
    name: "App",
    components: {},
});
</script>
<style>
main{
    margin-top: 5rem;
}
.guarda-clase{
    background-color: #c957bf67;
}
.ayudante-clase{
    background-color: #e0de5873;
}
.index-column {
    width: 50px !important;
}
</style>
