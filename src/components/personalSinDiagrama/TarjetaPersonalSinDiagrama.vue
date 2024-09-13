<template>
    <main>
        <div class="container">
            <div class="alert alert-danger" role="alert" v-if="message.activo">
                <h4 class="alert-heading">ATENCIÓN! {{ message.title }}</h4>
                <hr />
                {{ message.message }}
            </div>
        </div>
        <div class="container-fluid px-4">
            <h2 class="d-flex justify-content-start m-3">Linea Roca</h2>
            <h2 class="d-flex justify-content-end m-3">Registro de servicios personal sin diagrama C.C.P.T.</h2>
        </div>
        <div class="container-fluid mt-5">
            <table class="table table-bordered cabecera" style="position: sticky; top: 0; background-color: white; z-index: 1000;">
                <thead>
                    <tr>
                        <th class="col-1">Legajo</th>
                        <th class="col-2">Apellido</th>
                        <th class="col-2">Nombres</th>
                        <th class="col-2">Especialidad</th>
                        <th class="col-2">Descanso</th>
                        <th class="col-1">Dotación</th>
                        <th class="col-2">Periodo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{{ personal.legajo }}</td>
                        <td>{{ personal.apellido }}</td>
                        <td>{{ personal.nombres }}</td>
                        <td>{{ personal.especialidad }}</td>
                        <td>{{`${diaSemanaStr(personalSinDiagrama.francoInicio)} ${personalSinDiagrama.HoraInicio}`}}</td>
                        <td>{{ personal.dotacion }}</td>
                        <td class="celdaFecha">
                            <input
                                type="month"
                                id="monthInput"
                                class="form-control m-0"
                                v-model="selectedMonth"
                                @change="daysInMonth"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="barraBotones">
            <button class="btn btn-danger mx-3" @click="$router.push('/personalSinDiagrama')">Cerrar sin Guardar</button>
            <button class="btn btn-success mx-3" @click="guardarTarjeta()" >Guardar Cambios</button>
        </div>
        <div class="container-fluid">
            <table class="table table-bordered">
                <thead class="">
                    <tr class="">
                        <th class="col-1 cabecera" rowspan="2">Día</th>
                        <th class="col-1" rowspan="2">Diagrama</th>
                        <!-- <th scope="col" colspan="2">Desplazamiento</th> -->
                        <th class="col-1" rowspan="2">Disponible a la Hora</th>
                        <th class="col-2" colspan="2">Servicio</th>
                        <th class="col-1" rowspan="2">Total horas trabajadas</th>
                        <th class="col-6" rowspan="2">Observaciones</th>
                    </tr>
                    <tr>
                        <!-- <th scope="col">Desde</th>
                        <th scope="col">Hasta</th> -->
                        <th scope="col-12">Tomó</th>
                        <th scope="col-12">Dejó</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(day, index) in fechasDelMes" :key="index" :class="{ 'text-red': getJornadaForDay(selectedMonth, day).estilo }">
                        <td class="dia">{{   getDiaSemanaYMes(day,index) }}</td>
                        <!-- Columna Diagrama -->
                        <td class="celdaInput " @click="toggleEdit('tren', index)">
                            <select 
                                v-if="getJornadaForDay(selectedMonth, day).editable && editField === 'tren' && editIndex === index"
                                name="diagrama" 
                                id="diagrama"
                                v-model="editValue"
                                @change="saveEdit('tren', index)"
                                class="form-control"
                            >
                                <option  value=""> </option>
                                <option  value="DH anticipado">DH anticipado</option>
                                <option  value="Orden">Orden</option>
                            </select>
                        <span class="celdaInputAncho" v-else>
                            {{ getJornadaForDay(selectedMonth, day).tren || '-' }}
                        </span>
                        </td>

                        <!-- Columna Disponible a la Hora -->
                        <td class="celdaInput " @click="toggleEdit('disponibleHora', index)">
                        <input v-if="getJornadaForDay(selectedMonth, day).editable && editField === 'disponibleHora' && editIndex === index" 
                                type="time" 
                                v-model="editValue" 
                                :ref="'inputField-' + index"
                                @change="saveEdit('disponibleHora', index)">
                        <span class="celdaInputAncho" v-else>
                            {{ getJornadaForDay(selectedMonth, day).disponibleHora || '' }}
                        </span>
                        </td>

                        <!-- Columna Tomó -->
                        <td class="celdaInput " @click="toggleEdit('tomo', index)">
                        <input v-if="getJornadaForDay(selectedMonth, day).editable && editField === 'tomo' && editIndex === index" 
                                type="time" 
                                v-model="editValue" 
                                :ref="'inputField-' + index" 
                                @change="saveEdit('tomo', index)">
                        <span class="celdaInputAncho" v-else>
                            {{ getJornadaForDay(selectedMonth, day).tomo || '' }}
                        </span>
                        </td>

                        <!-- Columna Dejó -->
                        <td class="celdaInput " @click="toggleEdit('dejo', index)">
                        <input v-if="getJornadaForDay(selectedMonth, day).editable && editField === 'dejo' && editIndex === index" 
                                type="time" 
                                v-model="editValue" 
                                :ref="'inputField-' + index"
                                @change="saveEdit('dejo', index)">
                        <span class="celdaInputAncho" v-else>
                            {{ getJornadaForDay(selectedMonth, day).dejo || '' }}
                        </span>
                        </td>
                        <!-- Columna Total horas trabajadas -->
                        <td class="celdaInput" @click="toggleEdit('totalHoras', index)">
                        <input v-if="getJornadaForDay(selectedMonth, day).editable && editField === 'totalHoras' && editIndex === index" 
                                type="time" 
                                v-model="editValue" 
                                :ref="'inputField-' + index"
                                @change="saveEdit('totalHoras', index)">
                        <span class="celdaInputAncho" v-else>
                            {{ getJornadaForDay(selectedMonth, day).totalHoras || '' }}
                        </span>
                        </td>

                        <!-- Observaciones -->
                        <td class="celdaInput layout"
                            @click="toggleEdit('observaciones', index)" 
                            >
                            <input v-if="getJornadaForDay(selectedMonth, day).editable &&  editField === 'observaciones' && editIndex === index" 
                                    type="text" v-model="editValue" 
                                    :ref="'inputField-' + index" 
                                    @change="saveEdit('observaciones', index)">
                            <span class="celdaInputAncho" v-else >
                                {{ getJornadaForDay(selectedMonth, day).observaciones || '-' }}
                            </span>
                            <button class="btn btn-primary" v-if="getJornadaForDay(selectedMonth,day).nroNovedad" 
                                @click="$router.push(`/editNovedades/${getJornadaForDay(selectedMonth,day).nroNovedad}`)">
                                Ir a la novedad
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script lang="ts">
import { newToken } from "../../services/signService";
import { defineComponent } from "vue";
import {  defaultJornada, defaultNovedad, defaultPersonal, defaultPersonalSinDiagrama, defaultTurnos, dia_laboral, diaAnterior,   diaPosterior,   diferenciaHoras, dosDiasAnterior, esFechaMayorIgual, filtrarPorTurno, itinerarioType, loadNovedades, loadPersonal, loadPersonalSinDiagrama, loadTurnos,  obtenerNumeroDia, sumarHoras } from '../../utils/funciones';
import { IPersonal } from '../../interfaces/IPersonal';
import { IPersonalSinDiagrama, Jornada } from '../../interfaces/IPersonalSinDiagrama';
import { Novedad, Remplazo } from "../../interfaces/INovedades";
import { ITurno } from "../../interfaces/ITurno";
import { updatePersonalSinDiagrama } from "../../services/personalSinDiagramaService";
export default defineComponent({
    props: ["idPersonal", "idTarjeta"],
    data() {
            return {
            personal: {} as IPersonal,
            personalSinDiagrama: {} as IPersonalSinDiagrama,
            lstNovedades: [] as Novedad[],
            lstTurnos: [] as ITurno[],
            today: new Date(),
            selectedMonth: "",
            fechasDelMes: [] as string[],
            editField: null as string | null, // Campo en edición
            editIndex: null as number | null, // Índice de la fila en edición
            editValue: '' as string,          // Valor que se está editando
            message: {
                activo: false,
                status: "",
                title: "",
                message: "",
            },
        };
    },
    methods: {
        async guardarTarjeta(){
            try {
                await updatePersonalSinDiagrama(this.personalSinDiagrama.legajo,this.personalSinDiagrama);
                this.message.activo = true
                this.message.status = 'success'
                this.message.title = 'Tarjeta guardada con éxito'
                this.message.message = 'Se han guardado los datos satisfactoriamente!'
                setTimeout(()=>{
                    this.message.activo = false
                },5000)
            } catch (error) {
                console.error('Error al guardar la tarjeta:', error);
                this.message.activo = true
                this.message.status = 'danger'
                this.message.title = 'Ocurrió un error a guardar'
                this.message.message = 'Se produjo un error al intentar guardar, re intente nuevamente más tarde o comuníquese con el administrador'
                setTimeout(()=>{
                    this.message.activo = false
                },5000)
            }
        },
        daysInMonth() {
                const days = [];
                const date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1 // 0-indexed
                if(this.selectedMonth === ''){
                    year = date.getFullYear()
                    month = date.getMonth() + 1 // 0-indexed
                }else{
                    year = parseInt(this.selectedMonth.split("-")[0])
                    month = parseInt(this.selectedMonth.split("-")[1])
                }
                
                const diasDelMes = new Date(year, month, 0).getDate();

                for (let i = 1; i <= diasDelMes; i++) {
                    days.push(new Date(year, month - 1, i).toISOString().split('T')[0]);
                }
                this.fechasDelMes = days

        },
        getDiaSemanaYMes(day:string,index:number):string{
            const fecha = new Date(day+'T12:00');
            return `${this.diaSemanaStr(fecha.getDay())} - ${index + 1}` 
        },
        getColorClass(especialidad:string) {
            if (especialidad.includes("Ayudante")) {
                return "ayudante-clase";
            } else if (especialidad.includes("Guardatren")) {
                return "guarda-clase";
            }
            return ""; // No aplicar ninguna clase si no coincide
        },
        getJornadaForDay(periodo: string, day: string): Jornada {
            // Verifica si 'personalSinDiagrama' y 'meses' están definidos
            if (!this.personalSinDiagrama || !this.personalSinDiagrama.meses) {
                return defaultJornada(); // Devuelve un objeto vacío si no están definidos
            }

            // Obtén el mes correspondiente al periodo
            const mes = this.personalSinDiagrama.meses[periodo];

            // Verifica si el mes y el día existen
            if (!mes || !mes.days || !mes.days[day]) {
                return defaultJornada(); // Devuelve un objeto vacío si no existen
            }

            // Retorna la jornada correspondiente al día
            return mes.days[day];
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
        toggleEdit(field: string, index: number) {
            this.editField = field;
            this.editIndex = index;
            this.editValue = this.getJornadaForDay(this.selectedMonth, this.fechasDelMes[index])[field] || '-';

            // Espera hasta que el DOM esté listo para enfocar el input
            this.$nextTick(() => {
                const inputElement = this.$refs['inputField-' + index] as HTMLInputElement | null;
                if (inputElement && typeof inputElement.focus === 'function') {
                    inputElement.focus(); // Hace foco automáticamente en el input
                    inputElement.select(); // Opcional: selecciona todo el texto dentro del input
                }
            });
        },
        saveEdit(field: string, index: number) {
            // Guardar el valor editado en el campo correspondiente
            
            const jornadaAnt = this.getJornadaForDay(this.selectedMonth, diaAnterior(this.fechasDelMes[index]));
            const jornada = this.getJornadaForDay(this.selectedMonth, this.fechasDelMes[index]);
            const jornadaPos = this.getJornadaForDay(this.selectedMonth, diaPosterior(this.fechasDelMes[index]));
            const especialidad = this.personal.especialidad.toLowerCase();

            
            if (jornada) {
                jornada[field] = this.editValue ;  // Actualiza directamente la propiedad
            }

            if(field === 'tren' && this.editValue === 'Orden' && jornada['disponibleHora'] !== ''){
                jornada['tomo'] = jornada['tomo'] || jornada['disponibleHora']
                jornada['dejo'] = jornada['dejo'] || sumarHoras(jornada['tomo'], especialidad.includes('guardatren diesel') ? 7 : 6)
                jornada['totalHoras'] = diferenciaHoras(jornada['tomo'],jornada['dejo'])
                jornadaPos['disponibleHora'] = sumarHoras(jornadaAnt['dejo'],especialidad.includes('guardatren diesel') ? 17 : 18)
            }
            if(field === 'tren' && this.editValue === 'DH anticipado'){
                jornada['tomo'] = 'DH'
                jornada['dejo'] = 'DH'
                jornadaPos['disponibleHora'] = ''
            }
            if(field === 'tren' && this.editValue === ''){
                jornada['tomo'] = ''
                jornada['dejo'] = ''
                jornada['totalHoras'] = ''
            }
            if(field === 'dejo' ){
                jornadaPos['disponibleHora'] = sumarHoras(jornadaAnt['dejo'],especialidad.includes('guardatren diesel') ? 41 : 42)
                jornada['totalHoras'] = diferenciaHoras(jornada['tomo'],jornada['dejo'])
            }
            if(field === 'tomo' ){
                jornada['dejo'] = sumarHoras(jornada['tomo'], especialidad.includes('guardatren diesel') ? 7 : 6)
                jornada['totalHoras'] = diferenciaHoras(jornada['tomo'],jornada['dejo'])
                jornadaPos['disponibleHora'] = sumarHoras(jornadaAnt['dejo'],especialidad.includes('guardatren diesel') ? 41 : 42)
            }
            // if(field === 'disponibleHora' ){
            //     jornada['dejo'] = sumarHoras(jornada['tomo'], especialidad.includes('guardatren diesel') ? 7 : 6)
            //     jornada['totalHoras'] = diferenciaHoras(jornada['tomo'],jornada['dejo'])
            //     jornadaPos['disponibleHora'] = sumarHoras(jornadaAnt['dejo'],especialidad.includes('guardatren diesel') ? 41 : 42)
            // }

            this.editField = null;
            this.editIndex = null;
            this.editValue = '';
        },
        handleKeydown(event: KeyboardEvent, field: string, index: number) {
            
            if (event.key === 'Enter') {
                this.saveEdit(field, index);
                event.preventDefault();  // Evitar el comportamiento por defecto del enter
            }
        },
        buscarJornadas(fecha:string, nombreTurno:string,jornada:number){
            const date = new Date(fecha+"T12:00")
            const itinerario: string = itinerarioType(date);
            const turnosEncontrados = filtrarPorTurno(
                itinerario,
                this.lstTurnos,
                ["Jul24"],// provisorio
                nombreTurno
            );
            let turno:ITurno = defaultTurnos();
            
            if (turnosEncontrados.length > 1) 
                turno = turnosEncontrados.find((turno:ITurno) => turno.turno === `${nombreTurno}.${jornada}`) || defaultTurnos();
            else [turno] = turnosEncontrados
            
            return {tomo:turno.toma,dejo:turno.deja}
        },
        buscarNovedadesActivas(){
            const novedades = this.lstNovedades.filter((novedad:Novedad)=>{
                return novedad.legajo === this.personal.legajo && 
                !novedad.novedadInactiva
            })
            const relevos = this.lstNovedades.filter((novedad:Novedad)=>{
                return (novedad.remplazo.some((remplazo:Remplazo)=> remplazo.legajo === this.personal.legajo) && 
                !novedad.novedadInactiva)
            })

            // Función para calcular la disponibilidad
            const calcularDisponibilidad = (dia: string) => {
                const mes = this.personalSinDiagrama.meses[this.selectedMonth].days;
                const especialidad = this.personal.especialidad.toLowerCase();

                // Verificamos si existe el día anterior
                const diaAnt = mes[diaAnterior(dia+'T12:00')];
                const dosDiasAnt = mes[dosDiasAnterior(dia+'T12:00')];
                
                // Si el día anterior no existe, no hay nada que hacer
                if (!diaAnt) return;
                
                let horasASumar = especialidad.includes('guardatren diesel') ? 17 : 18;
                
                // Si el día anterior es 'DH', verificamos el día de dos días antes
                if (diaAnt.tomo === 'DH' && dosDiasAnt && dosDiasAnt.dejo !== '' ) {
                    horasASumar = especialidad.includes('guardatren diesel') ? 41 : 42;
                    this.personalSinDiagrama.meses[this.selectedMonth].days[dia].disponibleHora = sumarHoras(dosDiasAnt.dejo, horasASumar);
                } 
                // Si el día anterior no es 'DH', calculamos con el día anterior
                else if (diaAnt.dejo !== 'DH' && mes[dia].tomo !== 'DH' && diaAnt.dejo !== '') {
                    this.personalSinDiagrama.meses[this.selectedMonth].days[dia].disponibleHora = sumarHoras(diaAnt.dejo, horasASumar);
                }else
                    this.personalSinDiagrama.meses[this.selectedMonth].days[dia].disponibleHora = '';
            }

            
            this.fechasDelMes.forEach((dia:string)=>{
                const fecha = new Date(dia+"T12:00")
                // sino existe el dia se crea
                if (!this.personalSinDiagrama.meses[this.selectedMonth]) {
                    this.personalSinDiagrama.meses[this.selectedMonth] = {days:{}} 
                }
                if (!this.personalSinDiagrama.meses[this.selectedMonth].days[dia]) {
                    this.personalSinDiagrama.meses[this.selectedMonth].days[dia] = defaultJornada()
                }
                if(fecha.getDay() === this.personalSinDiagrama.francoInicio){
                    this.personalSinDiagrama.meses[this.selectedMonth].days[dia].observaciones = `DH del ciclo // desde ${this.diaSemanaStr(this.personalSinDiagrama.francoInicio)} ${this.personalSinDiagrama.HoraInicio}`
                    this.personalSinDiagrama.meses[this.selectedMonth].days[dia].dejo = this.personalSinDiagrama.HoraInicio
                }
                if(fecha.getDay() === this.personalSinDiagrama.francoInicio +1 ){
                    // this.personalSinDiagrama.meses[this.selectedMonth].days[(dia+'T12:00')].disponibleHora = ''
                    this.personalSinDiagrama.meses[this.selectedMonth].days[(dia)].disponibleHora = this.personalSinDiagrama.HoraHasta
                    this.personalSinDiagrama.meses[this.selectedMonth].days[(dia)].tomo = 'DH'
                    this.personalSinDiagrama.meses[this.selectedMonth].days[(dia)].dejo = 'DH'
                    this.personalSinDiagrama.meses[this.selectedMonth].days[(dia)].observaciones = `DH del ciclo // hasta ${this.diaSemanaStr(this.personalSinDiagrama.francoHasta)} ${this.personalSinDiagrama.HoraHasta}`
                }
                //Busco si estuvo relevando
                relevos.forEach((novedad:Novedad)=>{
                    novedad.remplazo.forEach((remplazo:Remplazo)=>{
                        if(remplazo.legajo === this.personal.legajo && esFechaMayorIgual(dia,remplazo.inicioRelevo) && (remplazo.finRelevo === '' || esFechaMayorIgual(remplazo.finRelevo,dia))){
                            // si tiene relevo por novedad se registra
                            this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tren = novedad.turno
                            this.personalSinDiagrama.meses[this.selectedMonth].days[dia].observaciones = `Relevando en la novedad N°${novedad._id} vice ${novedad.apellido} ${novedad.nombres} de baja por ${novedad.tipoNovedad}`
                            this.personalSinDiagrama.meses[this.selectedMonth].days[dia].nroNovedad = novedad._id
                            this.personalSinDiagrama.meses[this.selectedMonth].days[dia].editable = false

                            const francoNroSemana = obtenerNumeroDia(novedad.franco)
                            const jornada = dia_laboral(francoNroSemana, fecha.getDay());
                            
                            //reviso si esta de franco
                            if(francoNroSemana === fecha.getDay()){
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tomo = 'DH'
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].dejo = 'DH'
                            }else{
                                const {tomo,dejo} = this.buscarJornadas(dia,novedad.turno,jornada)
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tomo = tomo
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].dejo = dejo
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].totalHoras = diferenciaHoras(tomo,dejo)
                            }
                        }                    
                    })
                })
                // calculamos la disponibilidad
                calcularDisponibilidad(dia);

                // busco si tuvo baja por enfermedad
                novedades.forEach((novedad:Novedad)=>{
                    if(esFechaMayorIgual(dia,novedad.fechaBaja) && (novedad.fechaAlta === undefined || esFechaMayorIgual(novedad.fechaAlta,dia))){
                        // si tiene baja por novedad se registra
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tren = novedad.tipoNovedad
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].disponibleHora = '-'
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tomo = ''
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].dejo = ''
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].totalHoras = '-'
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].observaciones = `De baja por la novedad N°${novedad._id}`
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].nroNovedad = novedad._id
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].estilo = true
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].editable = false
                    }  
                })
                
            })
        },
    },
    async mounted() {
        const [year, month] = this.today.toISOString().split("-")
        this.selectedMonth = `${year}-${month}`;
        
        if (this.$route.params && this.$route.params.idPersonal != "") {
            const idPersonal = Array.isArray(this.$route.params.idPersonal)
                ? this.$route.params.idPersonal[0]
                : this.$route.params.idPersonal;

            const idTarjeta = Array.isArray(this.$route.params.idTarjeta)
                ? this.$route.params.idTarjeta[0]
                : this.$route.params.idTarjeta;
                
            this.personal = await loadPersonal(idPersonal) || defaultPersonal();
            this.personalSinDiagrama = await loadPersonalSinDiagrama(idTarjeta) || defaultPersonalSinDiagrama();
            this.lstNovedades = await loadNovedades() || [defaultNovedad()];
            this.lstTurnos = await loadTurnos() || [defaultTurnos()];
            this.daysInMonth()
            this.buscarNovedadesActivas()
        }
        // this.loadPersonales();
        newToken();
    },
    name: "App",
    components: {},
});
</script>

<style scoped>

main{
    margin-top: 5rem;
    font-size: 20px;
}
.table-bordered {
  border: 2px solid #aaa; /* Borde más grueso */
}

.table th,
.table td {
  text-align: center; /* Alineación centrada */

}

/* table thead tr {
  background-color: #222;
  border: 2px solid #aaa;
  padding: .35em;
} */

.layout {
    /* width: 100%; */
    display: flex;
    /* gap: 16px; */
    justify-content: space-between;
}

th {
    background-color: #ddd;
}

th,
td {
    padding: 5px; 
}
td{
    margin-top: 3px;
}
input{
    widows: 100%;
}
.barraBotones{
    display:flex;
    justify-content: end;
    margin-bottom: 1rem;
    margin-right: 1rem;
}
/* .barraBotones > button{
    margin-top: 2px;
} */
.dia{
    display:flex;
    justify-content: end;
}
.celdaFecha{
    padding: 0;
}
.celdaInput{
    padding: 0;
}
.celdaInput input {
    width: 100%;
    box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el ancho total */
}
.celdaInputAncho {
    width: 100%;
    text-align: left;
    margin-top: 2px;
}
.text-red td {
    color: red; /* Asegurar que el estilo también se aplique a los td dentro del tr */
    font-weight: bold;
}

/* .container {
  max-width: 1000px; /* Ajusta el ancho según sea necesario 
} */

/* thead th[colspan="2"] {
  text-align: center; /* Centrar las celdas con colspan 
} */
/* .cabecera{
    position: sticky; 
    top: 0; 
    background-color: white; 
    z-index: 1000;
} */
</style>