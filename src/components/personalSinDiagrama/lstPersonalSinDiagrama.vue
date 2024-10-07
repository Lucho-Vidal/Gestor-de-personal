<template>
    <main>
        <div class="container-fluid px-4">
            <div class="d-flex justify-content-between m-3">
                <span class="fs-3 ">Fecha: {{ today.toLocaleDateString() }}</span>
                <h2 class="">Tarjetas  de personal sin diagrama</h2>
            </div>

            <div class="d-flex justify-content-end">
                <label class="col-2">
                    Especialidad:
                    <select
                        name="especialidad"
                        id="especialidad"
                        class="form-control "
                        v-model="CEspecialidad"
                        required
                        @change="loadLists()"
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
                <label for="dotacion" class="col-1 mx-3">
                    Dotación:
                    <select
                    name="dotacion"
                    id="dotacion"
                    class="form-control"
                    @change="loadLists()"
                    v-model="dotacionesSeleccionadas"
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
            <hr>
            <div class="d-flex justify-content-between">
                <h2 class="d-flex justify-content-center">Lista de tarjetas Disponibles</h2>
                <div>
                    <button class="btn btn-info mx-1" @click.prevent="toggleExpandirTarjetas(firstList,'Disponible')">
                        {{ tarjetasDisponibleExpandido ? 'Contraer todas las Tarjetas' : 'Expandir todas las Tarjetas' }}
                    </button>
                    <button class="btn btn-warning mx-1 " @click.prevent="ordenarPorDisponibilidad(firstList)">
                            Ordenar Por Disponibilidad
                    </button>
                </div>
            </div>
            <table class="table table-striped table-hover ">
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
                    v-for="(personal, index) in firstList"
                    :key="personal._id"
                    @click="viewDetail(personal)"
                    @dragstart="handleDragStart(index, $event, 'todo')"
                    @drop="handleDrop(index, $event, 'todo')"
                    @dragover="handleDragOver($event)"
                    draggable="true"
                    :class="getColorClass(personal.especialidad)"
                >
                    <tr>
                        <td class="index-column" v-if="personal.legajo !== 0">{{ index +1 }}</td>
                        <td class="col-1" v-else></td>
                        <td class="col-1"  v-if="personal.legajo !== 0">{{ personal.legajo }}</td>
                        <td class="col-1" v-else></td>
                        <td class="col-1">{{ personal.apellido }}</td>
                        <td class="col-2">{{ personal.nombres }}</td>
                        <td class="col-1">{{ personal.turno }}</td>
                        <td class="col-1"  v-if="personal.legajo !== 0">{{ personalIndexadoSinDiagrama[personal.legajo] ? 
                                                `${diaSemanaStr(personalIndexadoSinDiagrama[personal.legajo].francoInicio)} 
                                                ${personalIndexadoSinDiagrama[personal.legajo].HoraInicio}`
                                                :"-" }}</td>
                        <td class="col-1" v-else></td>
                        <td class="col-1">{{ personal.especialidad }}</td>
                        <td class="col-1">{{ personal.dotacion }}</td>
                        <td class="col-2">{{ personal.observaciones }}</td>
                        <td class="col-1" v-if="personal.legajo !== 0">
                            <i
                                class="material-icons cursor-hand"
                                @click="edit(personal._id,personalIndexadoSinDiagrama[personal.legajo]._id)"
                                >edit_note</i
                            >
                        </td>
                        <td class="col-1" v-else></td>
                    </tr>
                    <tr class='custom-orange' v-if="personal.viewDetail && personalIndexadoSinDiagrama[personal.legajo] && personalIndexadoSinDiagrama[personal.legajo].mes && personalIndexadoSinDiagrama[personal.legajo].mes">
                    <!-- <tr  class='custom-orange' v-if="personal.viewDetail  && personalIndexadoSinDiagrama[personal.legajo].meses[selectedMonth]"> -->
                        <th class="col-1" colspan="1">fecha</th>
                        <th class="col-1" colspan="1">Diagrama</th>
                        <th class="col-1" colspan="1">Disponible a </th>
                        <th class="col-1" colspan="1">Toma</th>
                        <th class="col-1" colspan="1">Deja</th>
                        <th class="col-1" colspan="1">Total hs trabajado</th>
                        <th class="col-1" colspan="6">Observaciones</th>
                        
                    </tr>
                    <tr class='custom-orange' v-if="personal.viewDetail && personalIndexadoSinDiagrama[personal.legajo] && personalIndexadoSinDiagrama[personal.legajo].mes && personalIndexadoSinDiagrama[personal.legajo].mes">
                    <!-- <tr class='custom-orange' v-if="personal.viewDetail && personalIndexadoSinDiagrama[personal.legajo].meses[selectedMonth]"> -->
                        <td colspan="1">{{ today.toLocaleDateString() }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].tren }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].disponibleHora }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].tomo }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].dejo }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].totalHoras }}</td>
                        <td colspan="6">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].observaciones }}</td>
                    </tr>
                    <tr class='custom-orange' v-if="personal.viewDetail && personalIndexadoSinDiagrama[personal.legajo] && personalIndexadoSinDiagrama[personal.legajo].mes && personalIndexadoSinDiagrama[personal.legajo].mes">
                    <!-- <tr class='custom-orange' v-if="personal.viewDetail && personalIndexadoSinDiagrama[personal.legajo].meses[selectedMonth]"> -->
                        <td colspan="1">{{ new Date(tomorrowStr+'T12:00').toLocaleDateString() }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].tren }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].disponibleHora }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].tomo }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].dejo }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].totalHoras }}</td>
                        <td colspan="6">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].observaciones }}</td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <div class="d-flex justify-content-between">
                <h2 class="d-flex justify-content-center">Lista de tarjetas HTT</h2>
                <div>
                    <button class="btn btn-info mx-1" @click.prevent="toggleExpandirTarjetas(secondList,'HTT')">
                        {{ tarjetasHTTExpandido ? 'Contraer todas las Tarjetas' : 'Expandir todas las Tarjetas' }}
                    </button>
                    <button class="btn btn-warning mx-1 " @click.prevent="ordenarPorDisponibilidad(secondList)">
                            Ordenar Por Disponibilidad
                    </button>
                </div>
            </div>
            <table class="table table-striped table-hover ">
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
                    v-for="(personal, index) in secondList"
                    :key="personal._id"
                    @click="viewDetail(personal)"
                    @dragstart="handleDragStart(index, $event, 'done')"
                    @drop="handleDrop(index, $event, 'done')"
                    @dragover="handleDragOver($event)"
                    draggable="true"
                    :class="getColorClass(personal.especialidad)"
                >
                <tr>
                        <td class="index-column" v-if="personal.legajo !== 0">{{ index +1 }}</td>
                        <td class="col-1" v-else></td>
                        <td class="col-1"  v-if="personal.legajo !== 0">{{ personal.legajo }}</td>
                        <td class="col-1" v-else></td>
                        <td class="col-1">{{ personal.apellido }}</td>
                        <td class="col-2">{{ personal.nombres }}</td>
                        <td class="col-1">{{ personal.turno }}</td>
                        <td class="col-1"  v-if="personal.legajo !== 0">{{ personalIndexadoSinDiagrama[personal.legajo] ? 
                                                `${diaSemanaStr(personalIndexadoSinDiagrama[personal.legajo].francoInicio)} 
                                                ${personalIndexadoSinDiagrama[personal.legajo].HoraInicio}`
                                                :"-" }}</td>
                        <td class="col-1" v-else></td>
                        <td class="col-1">{{ personal.especialidad }}</td>
                        <td class="col-1">{{ personal.dotacion }}</td>
                        <td class="col-2">{{ personal.observaciones }}</td>
                        <td class="col-1" v-if="personal.legajo !== 0">
                            <i
                                class="material-icons cursor-hand"
                                @click="edit(personal._id,personalIndexadoSinDiagrama[personal.legajo]._id)"
                                >edit_note</i
                            >
                        </td>
                        <td class="col-1" v-else></td>
                    </tr>
                    <tr  class='custom-orange' v-if="personal.viewDetail  && personalIndexadoSinDiagrama[personal.legajo].mes">
                        <th class="col-1" colspan="1">fecha</th>
                        <th class="col-1" colspan="1">Diagrama</th>
                        <th class="col-1" colspan="1">Disponible a </th>
                        <th class="col-1" colspan="1">Toma</th>
                        <th class="col-1" colspan="1">Deja</th>
                        <th class="col-1" colspan="1">Total hs trabajado</th>
                        <th class="col-1" colspan="6">Observaciones</th>
                        
                    </tr>
                    <tr class='custom-orange' v-if="personal.viewDetail && personalIndexadoSinDiagrama[personal.legajo].mes">
                        <td colspan="1">{{ today.toLocaleDateString() }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].tren }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].disponibleHora }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].tomo }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].dejo }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].totalHoras }}</td>
                        <td colspan="6">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[today.toISOString().split('T')[0]].observaciones }}</td>
                    </tr>
                    <tr class='custom-orange' v-if="personal.viewDetail && personalIndexadoSinDiagrama[personal.legajo].mes">
                        <td colspan="1">{{ new Date(tomorrowStr+'T12:00').toLocaleDateString() }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].tren }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].disponibleHora }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].tomo }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].dejo }}</td>
                        <td colspan="1">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].totalHoras }}</td>
                        <td colspan="6">{{ personalIndexadoSinDiagrama[personal.legajo].mes.days[tomorrowStr].observaciones }}</td>
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
import { defaultPersonal, obtenerDotaciones, diaPosterior } from '../../utils/funciones';
import { getPersonalesSinDiagrama } from "../../services/personalSinDiagramaService";
import { IPersonalSinDiagrama } from "../../interfaces/IPersonalSinDiagrama";

export default defineComponent({
    props: ['idPersonal', 'idDato', 'idVia'],
    data() {
        return {
            personales: [] as IPersonal[],
            personalesSinDiagrama: [] as IPersonalSinDiagrama[],
            // personalesFiltrados: [] as IPersonal[],
            datosPersonales: [] as IDatoPersonal[],
            conocimientosVias: [] as IConocimientosVias[],
            personalIndexado: {} as Record<number, IPersonal>,
            personalIndexadoSinDiagrama: {} as Record<number, IPersonalSinDiagrama>,
            dotacionesPermitidas: [] as string[],
            dotacionesSeleccionadas: "" as string,
            CEspecialidad: "Conductor Electrico" as string,
            checkboxTurno: [] as string[],
            mostrarModalSearch: false,
            today: new Date(),
            tomorrowStr: '' as string,
            selectedMonth: '' as string,
            search: "" as string,
            searchTurno: "" as string,
            searchLegajo: null,
            tarjetasDisponibleExpandido: false,
            tarjetasHTTExpandido: false,

            //drag And Drop
            firstList: [] as IPersonal[], // Lista de 'todo'
            secondList: [] as IPersonal[], // Lista de 'done'
            dragIndex: null as number | null,
            draggedItem: null as IPersonal | null,

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
        async loadPersonales(){
            try {
                const res = await getPersonales();
                this.personales = this.filtrarCiclo(res.data);                
                this.personalIndexado = this.indexarPersonal(this.personales);
                this.dotacionesPermitidas = obtenerDotaciones(this.personales);
                // this.loadPersonalesFiltrados()
                this.loadLists()
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

        // drag and drop
        handleDragStart(index: number, event: DragEvent, listType: string) {
            this.dragIndex = index;
            this.draggedItem = listType === 'todo' ? this.firstList[index] : this.secondList[index];
            if (event.dataTransfer) {
                event.dataTransfer.setData('text/plain', index.toString());
                event.dataTransfer.effectAllowed = 'move';
            }
        },
        handleDragOver(event: DragEvent) {
            event.preventDefault(); // Necesario para permitir el drop
        },
        handleDrop(index: number, event: DragEvent, listType: string) {
            event.preventDefault();

            const draggedIndex = this.dragIndex;
            if (this.draggedItem && draggedIndex !== null) {
                // Si se suelta en la misma lista (reordenar)
                if (listType === 'todo' && this.firstList.includes(this.draggedItem)) {
                    if (draggedIndex !== index) {
                        const [item] = this.firstList.splice(draggedIndex, 1);
                        this.firstList.splice(index, 0, item);
                    }
                } else if (listType === 'done' && this.secondList.includes(this.draggedItem)) {
                    if (draggedIndex !== index) {
                        const [item] = this.secondList.splice(draggedIndex, 1);
                        this.secondList.splice(index, 0, item);
                    }
                }
                // Si se suelta en la otra lista (mover entre listas)
                else if (listType === 'todo' && this.secondList.includes(this.draggedItem)) {
                    if(this.firstList.length === 1 && this.firstList[0].legajo === 0) this.firstList = []
                    const [item] = this.secondList.splice(draggedIndex, 1);
                    this.firstList.splice(index, 0, item);
                    if(this.secondList.length === 0 ) this.secondList.push(defaultPersonal())

                } else if (listType === 'done' && this.firstList.includes(this.draggedItem)) {
                    if(this.secondList.length === 1 && this.secondList[0].legajo === 0) this.secondList = []
                    const [item] = this.firstList.splice(draggedIndex, 1);
                    this.secondList.splice(index, 0, item);
                    if(this.firstList.length === 0 ) this.firstList.push(defaultPersonal())
                }

                // Guardar las listas en localStorage después de cada cambio
                this.saveLists();
            }

            // Resetear dragIndex y draggedItem después de soltar
            this.dragIndex = null;
            this.draggedItem = null;
        },
        saveLists() {
            // Guardar ambas listas en localStorage
            localStorage.setItem(`firstDragAndDrop${this.dotacionesSeleccionadas}-${this.CEspecialidad}`, JSON.stringify(this.firstList));
            localStorage.setItem(`secondDragAndDrop${this.dotacionesSeleccionadas}-${this.CEspecialidad}`, JSON.stringify(this.secondList));
        },
        loadLists() {
            localStorage.setItem('dotacion', this.dotacionesSeleccionadas );
             // Cargar las listas desde localStorage
            const savedFirstList = localStorage.getItem(`firstDragAndDrop${this.dotacionesSeleccionadas}-${this.CEspecialidad}`);
            const savedSecondList = localStorage.getItem(`secondDragAndDrop${this.dotacionesSeleccionadas}-${this.CEspecialidad}`);
            
            
            if (savedFirstList && savedSecondList) {
                this.firstList = JSON.parse(savedFirstList);
                this.secondList = JSON.parse(savedSecondList);                
            } else {
                // Si no hay datos en localStorage, cargar datos iniciales
                this.filtrarPersonales();
            }
            
        },

        ordenarPorDisponibilidad(list: IPersonal[]) {
            const fechaStr: string = this.today.toISOString().split('T')[0];
            
            list.sort((a: IPersonal, b: IPersonal) => {
                const mesA = this.personalIndexadoSinDiagrama[a.legajo]?.mes; // Acceso a un solo mes
                const mesB = this.personalIndexadoSinDiagrama[b.legajo]?.mes;

                // Acceder a los días de ese mes
                const dispA = mesA?.days?.[fechaStr]?.disponibleHora ? new Date(mesA.days[fechaStr].disponibleHora) : null;
                const dispB = mesB?.days?.[fechaStr]?.disponibleHora ? new Date(mesB.days[fechaStr].disponibleHora) : null;

                // Si ambos son null, mantener el orden
                if (dispA === null && dispB === null) return 0;

                // Si `dispA` es null, queremos que A aparezca antes en la lista
                if (dispA === null) return -1;

                // Si `dispB` es null, queremos que B aparezca antes en la lista
                if (dispB === null) return 1;

                // Comparar las horas si ambos son válidos
                return dispA.getTime() - dispB.getTime();
            });
        },
        toggleExpandirTarjetas(list: IPersonal[],lista:string) {
            let tarjetasExpandido: boolean = false;

            if(lista === 'Disponible'){
                tarjetasExpandido = !this.tarjetasDisponibleExpandido  
                this.tarjetasDisponibleExpandido = tarjetasExpandido 
            }
            else if(lista === 'HTT'){
                tarjetasExpandido = !this.tarjetasHTTExpandido  
                this.tarjetasHTTExpandido = tarjetasExpandido 
            }

            list.forEach((personal: IPersonal) => {
                personal.viewDetail = tarjetasExpandido; // Expande o contrae las tarjetas
            });
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
            this.firstList = [];
            this.secondList = [];
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
                // console.log("DEBUG1",auxPersonales);
            // filtro dotacion y especialidad
                auxPersonales = auxPersonales.filter((personal:IPersonal) =>{
                    console.log("DEBUG4",personal.especialidad);
                    return cDotacion.includes(personal.dotacion) && 
                        cEspecialidad.includes(personal.especialidad)
                })
            }
            // console.log("DEBUG2",auxPersonales);

            //Ordeno la lista
            this.firstList = this.ordenarPorTurno(auxPersonales)
            this.secondList.push(defaultPersonal())
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
            // this.loadPersonalesFiltrados();
            this.dotacionesSeleccionadas = localStorage.getItem('dotacion')||'PC';
            this.loadPersonales();
            this.loadPersonalSinDiagrama()
            const [year, month] = this.today.toISOString().split("-")
            this.selectedMonth = `${year}-${month}`;
            this.tomorrowStr = diaPosterior(this.today.toISOString().split('T')[0])
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
.custom-orange{
    background-color: #fd7d1485;
}
.index-column {
    width: 50px !important;
}
</style>
