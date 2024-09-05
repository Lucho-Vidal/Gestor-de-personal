<template>
    <main>
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
                        <td>{{ `${diaSemanaStr(personalSinDiagrama.francoInicio)} ${personalSinDiagrama.HoraInicio}` }}</td>
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
                    <tr v-for="(day, index) in fechasDelMes" :key="index" :class="{ 'text-red': getJornadaForDay(selectedMonth, day).estilo  }">
                        <td>{{ index + 1 }}</td>
                        <td>{{ getJornadaForDay(selectedMonth, day).tren || '-' }}</td>
                        <td>{{ getJornadaForDay(selectedMonth, day).disponibleHora || '' }}</td>
                        <td>{{ getJornadaForDay(selectedMonth, day).tomo || '' }}</td>
                        <td>{{ getJornadaForDay(selectedMonth, day).dejo || '' }}</td>
                        <td>{{ getJornadaForDay(selectedMonth, day).totalHoras || '' }}</td>
                        <td class="layout">{{ getJornadaForDay(selectedMonth, day).observaciones || '' }} 
                            <button 
                                class="btn btn-primary" 
                                v-if="getJornadaForDay(selectedMonth,day).nroNovedad" 
                                @click="$router.push(`/editNovedades/${getJornadaForDay(selectedMonth,day).nroNovedad}`)">
                                Ir a la novedad</button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script lang="ts">
import { newToken } from "../../services/signService";
import { defineComponent } from "vue";
import {  defaultJornada, defaultNovedad, defaultPersonal, defaultPersonalSinDiagrama, defaultTurnos, dia_laboral,  diaAnterior,  diferenciaHoras, esFechaMayorIgual, filtrarPorTurno, itinerarioType, loadNovedades, loadPersonal, loadPersonalSinDiagrama, loadTurnos,  obtenerNumeroDia, sumarHoras } from '../../utils/funciones';
import { IPersonal } from '../../interfaces/IPersonal';
import { IPersonalSinDiagrama, Jornada } from '../../interfaces/IPersonalSinDiagrama';
import { Novedad, Remplazo } from "../../interfaces/INovedades";
import { ITurno } from "../../interfaces/ITurno";
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
        };
    },
    methods: {
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
        buscarJornadas(fecha:string, nombreTurno:string,jornada:number){
            const date = new Date(fecha+"T12:00")
            const itinerario: string = itinerarioType(date);
            const turnosEncontrados = filtrarPorTurno(
                itinerario,
                this.lstTurnos,
                ["Jul24"],// provisorio
                nombreTurno
            );
            // console.log(nombreTurno);
            // console.log(date);
            // console.log(itinerario);
            // console.log(this.lstTurnos);
            // console.log(turnosEncontrados);
            let turno:ITurno = defaultTurnos();
            if (turnosEncontrados.length > 1) 
                turno = turnosEncontrados.find((turno:ITurno) => turno.turno === `${nombreTurno}.${jornada}`) || defaultTurnos();
            else [turno] = turnosEncontrados
            
            return {tomo:turno.toma,dejo:turno.deja}
        },
        buscarNovedadesActivas(){
            let horaDisp:string = '--:--';
            const novedades = this.lstNovedades.filter((novedad:Novedad)=>{
                return novedad.legajo === this.personal.legajo && 
                !novedad.novedadInactiva
            })
            const relevos = this.lstNovedades.filter((novedad:Novedad)=>{
                return (novedad.remplazo.some((remplazo:Remplazo)=> remplazo.legajo === this.personal.legajo) && 
                !novedad.novedadInactiva)
            })
            
            this.fechasDelMes.forEach((dia:string)=>{
                // sino existe el dia se crea
                if (!this.personalSinDiagrama.meses[this.selectedMonth]) {
                    this.personalSinDiagrama.meses[this.selectedMonth] = {days:{}} 
                }
                if (!this.personalSinDiagrama.meses[this.selectedMonth].days[dia]) {
                    this.personalSinDiagrama.meses[this.selectedMonth].days[dia] = defaultJornada()
                }
                relevos.forEach((novedad:Novedad)=>{
                    novedad.remplazo.forEach((remplazo:Remplazo)=>{
                        // tengo que buscar los datos del turno
                                                    
                        if(remplazo.legajo === this.personal.legajo && esFechaMayorIgual(dia,remplazo.inicioRelevo) && (remplazo.finRelevo === '' || esFechaMayorIgual(remplazo.finRelevo,dia))){
                            // si tiene relevo por novedad se registra
                            this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tren = novedad.turno
                            this.personalSinDiagrama.meses[this.selectedMonth].days[dia].observaciones = `Relevando en la novedad N°${novedad._id} vice ${novedad.apellido} ${novedad.nombres} de baja por ${novedad.tipoNovedad}`
                            this.personalSinDiagrama.meses[this.selectedMonth].days[dia].nroNovedad = novedad._id
                            const fecha = new Date(dia+"T12:00")
                            const francoNroSemana = obtenerNumeroDia(novedad.franco)
                            if(francoNroSemana === fecha.getDay()){
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tomo = 'DH'
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].dejo = 'DH'
                                if(this.personalSinDiagrama.meses[this.selectedMonth].days[diaAnterior(dia)])
                                    horaDisp = sumarHoras(this.personalSinDiagrama.meses[this.selectedMonth].days[diaAnterior(dia)].dejo,18)
                                else horaDisp = '-:-'

                            }else{
                                const jornada = dia_laboral(francoNroSemana, fecha.getDay());
                                
                                const {tomo,dejo} = this.buscarJornadas(dia,novedad.turno,jornada)
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].disponibleHora = horaDisp
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tomo = tomo
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].dejo = dejo
                                this.personalSinDiagrama.meses[this.selectedMonth].days[dia].totalHoras = diferenciaHoras(tomo,dejo)
                                horaDisp = sumarHoras(dejo,18)
                            }

                        }                    
                    })
                })
                novedades.forEach((novedad:Novedad)=>{
                    if(esFechaMayorIgual(dia,novedad.fechaBaja) && (novedad.fechaAlta === undefined || esFechaMayorIgual(novedad.fechaAlta,dia))){
                        // si tiene baja por novedad se registra
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tren = novedad.tipoNovedad
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].disponibleHora = '-'
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].tomo = '-'
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].dejo = '-'
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].totalHoras = '-'
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].observaciones = `De baja por la novedad N°${novedad._id}`
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].nroNovedad = novedad._id
                        this.personalSinDiagrama.meses[this.selectedMonth].days[dia].estilo = true
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
            // console.log(this.personalSinDiagrama);
            // this.personalSinDiagramaPorPeriodo = await loadPersonalSinDiagramaPorPeriodo(this.personal.legajo,this.selectedMonth) || defaultPersonalSinDiagrama();
            // console.log(this.personalSinDiagramaPorPeriodo);
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
}
.table-bordered {
  border: 2px solid #aaa; /* Borde más grueso */
}

.table th,
.table td {
  text-align: center; /* Alineación centrada */

}

table thead tr {
  background-color: #222;
  border: 2px solid #aaa;
  padding: .35em;
}

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
  padding: 10px; /* Espaciado para las celdas */
}
.celdaFecha{
    padding: 0;
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