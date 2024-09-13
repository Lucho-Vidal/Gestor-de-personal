import { CambioTurno } from "@/interfaces/ICambioTurno";
import { Novedad, Remplazo } from "@/interfaces/INovedades";
import { Ordenamiento } from "@/interfaces/IOrdenamientos";
import { IPersonal } from "@/interfaces/IPersonal";
import { IPersonalSinDiagrama, Jornada } from "@/interfaces/IPersonalSinDiagrama";
import { Registro } from "@/interfaces/IRegistro";
import { ITurno, Vueltas } from "@/interfaces/ITurno";
import { User } from "@/interfaces/IUser";
import { Itinerario } from "@/interfaces/Itinerario";
import { getCambioTurnos } from "@/services/cambioTurnoService";
import { getItinerario } from "@/services/itinerarioService";
import { getNovedades } from "@/services/novedadesService";
import { getPersonal, getPersonales } from "@/services/personalService";
import { getPersonalSinDiagrama } from "@/services/personalSinDiagramaService";
import { createRegistro } from "@/services/registrosService";
import { getTurnos } from "@/services/turnosService";
import { AxiosError } from "axios";
import * as XLSX from 'xlsx';

// Validaciones:
export function esFechaMayor(dateMayor: string, dateMenor: string) {
    if (dateMayor && dateMenor) {
        const formattedDateMayor = new Date(dateMayor)
            .toISOString()
            .split("T")[0];
        const formattedDateMenor = new Date(dateMenor)
            .toISOString()
            .split("T")[0];
        return formattedDateMayor > formattedDateMenor;
    } else {
        return false;
    }
}
export function esFechaMayorIgual(dateMayor: string, dateMenor: string) {
    if (dateMayor && dateMenor) {
        const formattedDateMayor = new Date(dateMayor)
            .toISOString()
            .split("T")[0];
        const formattedDateMenor = new Date(dateMenor)
            .toISOString()
            .split("T")[0];
        return formattedDateMayor >= formattedDateMenor;
    } else {
        return false;
    }
}
export function esFechaIgual(dateMayor: string, dateMenor: string) {
    if (dateMayor && dateMenor) {
        const formattedDateMayor = new Date(dateMayor)
            .toISOString()
            .split("T")[0];
        const formattedDateMenor = new Date(dateMenor)
            .toISOString()
            .split("T")[0];
        return formattedDateMayor === formattedDateMenor;
    } else {
        return false;
    }
}
export function compararHoras(hora1: string, hora2: string): number {
    // Extraer las horas y minutos de cada cadena
    const [hora1Hours, hora1Minutes] = hora1.split(":").map(Number);
    const [hora2Hours, hora2Minutes] = hora2.split(":").map(Number);

    // Comparar horas
    if (hora1Hours !== hora2Hours) {
        return hora1Hours - hora2Hours;
    }

    // Si las horas son iguales, comparar minutos
    return hora1Minutes - hora2Minutes;
}
export function diferenciaHoras(hora1: string, hora2: string): string {
    // Función auxiliar para crear una fecha con la hora y minutos de la cadena proporcionada
    function newDate(hora: string, incrementarDia: boolean = false) {
        const [horaN, minutosN] = hora.split(":").map(Number);
        let date = new Date();
        date.setHours(horaN);
        date.setMinutes(minutosN);

        // Verificar si horaN y minutosN son números válidos
        if (isNaN(horaN) || isNaN(minutosN)) return null;

        // Si incrementarDia es verdadero, sumamos 1 día a la fecha
        if (incrementarDia) {
            date.setDate(date.getDate() + 1);
        }
        return date;
    }

    // Crear las fechas
    let dateDesde = newDate(hora1);
    let dateHasta = newDate(hora2);

    
    // Si la fecha no es válida, devolver una cadena vacía
    if (!dateDesde || !dateHasta) return '';

    // Si la hora2 es anterior a la hora1, asumimos que es el día siguiente
    if (dateHasta < dateDesde) {
        dateHasta = newDate(hora2, true); // Incrementar el día en hora2
        
        // Volvemos a verificar si la fecha es válida
        if (!dateHasta) return '';
    }

    // Calcular la diferencia en minutos
    let minutos = (dateHasta.getTime() - dateDesde.getTime()) / 1000 / 60;
    
    let horas = Math.floor(minutos / 60);  // Obtener las horas completas
    minutos = minutos % 60;                // Obtener los minutos restantes
    
    // Formatear el resultado para que siempre muestre dos dígitos en horas y minutos
    const horasStr = horas.toString().padStart(2, '0');
    const minutosStr = minutos.toString().padStart(2, '0');
    
    return `${horasStr}:${minutosStr}`;
}
export function sumarHoras(hora: string, cantidadHoras: number): string {
    // Función auxiliar para crear una fecha con la hora proporcionada
    function newDate(hora: string) {
        const partes = hora.split(":");

        // Validar que la hora tenga el formato adecuado (hh:mm)
        if (partes.length !== 2) return null;

        const [horaN, minutosN] = partes.map(Number);

        // Verificar si horaN y minutosN son números válidos
        if (isNaN(horaN) || isNaN(minutosN)) return null;

        let date = new Date();
        date.setHours(horaN);
        date.setMinutes(minutosN);
        return date;
    }

    // Crear la fecha inicial a partir de la hora proporcionada
    let date = newDate(hora);

    // Si la fecha no es válida, devolver una cadena vacía
    if (!date) return '';

    // Sumar la cantidad de horas a la fecha
    date.setHours(date.getHours() + cantidadHoras);

    // Extraer las horas y minutos de la fecha resultante
    let horas = date.getHours();
    let minutos = date.getMinutes();

    // Formatear para que siempre sean dos dígitos
    const horasStr = horas.toString().padStart(2, '0');
    const minutosStr = minutos.toString().padStart(2, '0');

    return `${horasStr}:${minutosStr}`;
}
export function diaAnterior(fecha: string): string {
    // Crear una instancia de Date a partir del string proporcionado
    let date = new Date(fecha);

    // Restar un día
    date.setDate(date.getDate() - 1);

    // Formatear el resultado como "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JS son de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
export function dosDiasAnterior(fecha: string): string {
    // Crear una instancia de Date a partir del string proporcionado
    let date = new Date(fecha);

    // Restar un día
    date.setDate(date.getDate() - 2);

    // Formatear el resultado como "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JS son de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
export function diaPosterior(fecha: string): string {
    // Separar la fecha en año, mes y día
    const [year, month, day] = fecha.split('-').map(Number);

    // Crear una nueva fecha manualmente
    let date = new Date(year, month - 1, day); // Los meses en JS van de 0 a 11

    // Sumar un día
    date.setDate(date.getDate() + 1);

    // Obtener los nuevos valores de año, mes y día
    const newYear = date.getFullYear();
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Asegura formato de 2 dígitos
    const newDay = date.getDate().toString().padStart(2, '0');

    // Devolver la nueva fecha en formato YYYY-MM-DD
    return `${newYear}-${newMonth}-${newDay}`;
}
export function buscarPersonalACargo(fecha: Date,inputDate: string,turnosAImprimir: ITurno[],personales: IPersonal[],novedades: Novedad[],cambiosTurnos:CambioTurno[]) {
    try {
        turnosAImprimir.forEach((turno: ITurno) => {
            const personal = filtroPersonal(turno.turno,fecha,personales);

            novedades.forEach((novedad: Novedad) => {
                const {
                    legajo,
                    fechaBaja,
                    fechaAlta,
                    HNA,
                    novedadInactiva,
                } = novedad;
                if (
                    legajo === personal.legajo &&
                    !novedadInactiva &&
                    ((HNA &&
                        esFechaMayorIgual(
                            inputDate,
                            fechaBaja
                        )) ||
                        (esFechaMayorIgual(
                            inputDate,
                            fechaBaja
                        ) &&
                            esFechaMayorIgual(
                                fechaAlta,
                                inputDate
                            )))
                ) {
                    personal.nombres = obtenerNombreConReemplazo(novedad,inputDate,cambiosTurnos);
                }
            });

            // Asignar personal al array turnosAImprimir
            if (personal.nombres !== undefined) {
                                const cambiado = buscarCambioTurno(cambiosTurnos,inputDate,personal.legajo)
                if(cambiado){
                    turno.personal = `${cambiado.apellido} ${cambiado.nombres}`
                }else{
                    turno.personal = personal.nombres;
                }
            }
        });
    } catch (error) {
        console.error("Error en buscarPersonalACargo:", error);
    }
}
export function obtenerNombreConReemplazo(novedad: Novedad, inputDate: string , cambiosTurnos: CambioTurno[]): string {
    if (novedad.remplazo && novedad.remplazo.length > 0) {
        // buscamos el primero que cumple con la fecha input sea mayorIgual inicio de relevo Y si existe finRelevo que sea mayorIgual a inputDate SINO la que no tenga fin de relevo
        const remplazo = novedad.remplazo.find((remplazo: Remplazo) => {
            return (
                esFechaMayorIgual(
                    inputDate,
                    remplazo.inicioRelevo
                ) &&
                ((remplazo.finRelevo &&
                    esFechaMayorIgual(
                        remplazo.finRelevo,
                        inputDate
                    )) ||
                    !remplazo.finRelevo)
            );
        });
        if (remplazo) {
            // vamos a verificar que no este cambiado de turno
            if(remplazo.legajo == null) return ''
            const cambiado = buscarCambioTurno(cambiosTurnos,inputDate,remplazo.legajo)
            if(cambiado){
                return `${cambiado.apellido} ${cambiado.nombres}`
            }else{
            
                return `${remplazo.apellido} ${remplazo.nombres}`;
            }
        } else {
            return "Sin Cubrir";
        }
    } else {
        return "Sin Cubrir";
    }
}
export function filtrarPorTurno(itinerario: string,listaTurnos: ITurno[],circularSeleccionada: string[],turno: string):ITurno[] {
    const turnos: ITurno[] = [];
    listaTurnos.forEach((diag: ITurno) => {
        if (
            diag.turno.toLowerCase().includes(turno.toLowerCase()) &&
            diag.itinerario == itinerario &&
            circularSeleccionada.includes(diag.circular)
        ) {
            turnos.push(diag);
        }
    });
    return turnos;
}
export function filtroTrenes(itinerario: string,listaTurnos: ITurno[],circularSeleccionada: string[],tren: number) {
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
}
export function filtroItinerario(itinerario: string,listaItinerario: Itinerario[],tren: number) {
    /* Este método buscar en el array itinerario los horarios de pasadas por cada estación
    las guarda en el array itFiltrado  */
    const itFiltrados: Itinerario[] = listaItinerario.filter(
        (it: Itinerario) => {
            return it.tren == tren && it.itinerario == itinerario;
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
}
export function filtroPersonal(turno: string, fecha: Date, personales: IPersonal[],) {
    try {
        let titular: IPersonal[];

        turno = turno.trim();
        if (turno.indexOf(".") !== -1 && !turno.toLowerCase().includes("prog")) {
            const indexPunto = turno.indexOf(".");
            const diaLab = Number(turno[indexPunto + 1]);
            const diag = turno.split(".")[0];
            const franco = dia_laboral(diaLab, fecha.getDay());

            titular = personales.filter((personal) => {
                if(personal.especialidad.toLowerCase().includes("cond")) {
                }
                return (
                    personal.turno === diag &&
                    Number(personal.franco) === franco
                );
            });
            titular = personales.filter((personal) => {
                return (
                    personal.turno === diag &&
                    Number(personal.franco) === franco
                );
            });
            
        } else {
            
            titular = personales.filter(
                (personal) =>{
                    // console.log("DEBUG turno",turno);
                    if(personal.turno) return personal.turno.toLowerCase() === turno.toLowerCase()
            });
            titular = personales.filter(
                (personal) =>{
                    if(personal.turno) 
                    return personal.turno.toLowerCase() === turno.toLowerCase()
                });
        }
        
        
        return {
            turno: turno,
            legajo: titular[0].legajo || 0,
            nombres: titular[1]
                ? `${titular[0].apellido} ${titular[0].nombres} - Ayudante: ${titular[1].apellido} ${titular[1].nombres}`:
                titular[0]
                ? `${titular[0].apellido} ${titular[0].nombres}`
                : "",
        };
    } catch (e) {
        console.error(e);
        return {};
    }
}
export function dia_laboral(diaLaboral: number, hoy: number) {
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
}
export function obtenerTiposCirculares(turnos: ITurno[]) {
    // Filtramos aquellos turnos que tengan definida la propiedad "circular"
    const turnosFiltrados = turnos.filter(
        (turno) => turno.circular !== undefined
    );

    // Usamos Set para obtener valores únicos de la propiedad "circular"
    const circularesUnicas = [
        ...new Set(turnosFiltrados.map((turno) => turno.circular)),
    ];

    return circularesUnicas;
}
export function obtenerDotaciones(personal: IPersonal[]) {
    // Filtramos aquellos turnos que tengan definida la propiedad "dotacion"
    const personalFiltrados = personal.filter(
        (personal) => personal.dotacion !== undefined
    );

    // Usamos Set para obtener valores únicos de la propiedad "circular"
    const dotacionesUnicas = [
        ...new Set(personalFiltrados.map((personal) => personal.dotacion)),
    ];

    return dotacionesUnicas;
}
export function buscarCambioTurno(cambiosTurnos:CambioTurno[],inputDate:string,legajo: number){
    
    let i = 0
    let cambiado
    let condition = true;
    while ( i < cambiosTurnos.length && condition ){
        if(
            esFechaIgual(cambiosTurnos[i].fechaCambio,inputDate) &&
            cambiosTurnos[i].personal[0].legajo ===  legajo
        ){  
            cambiado = cambiosTurnos[i].personal[1] 
            condition = false
        }else if(
            esFechaIgual(cambiosTurnos[i].fechaCambio,inputDate) &&
            cambiosTurnos[i].personal[1].legajo === legajo
        ){
            cambiado = cambiosTurnos[i].personal[0];
            condition = false
            console.log(cambiado);

        }
        i++
    }
    return cambiado
}
export function handleRequestError(error: AxiosError) {
    console.error("Error en la solicitud:", error);

    if (error.response && error.response.status === 401) {
        // Manejar la lógica de redirección a la página de inicio de sesión
        localStorage.removeItem("username");
        localStorage.removeItem("roles");
        localStorage.removeItem("token");
        // this.$router.push("/login");
    } else {
        // Manejar otros errores de solicitud
        // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
    }
}
export async function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        const arrayBuffer = await file.arrayBuffer();
        return XLSX.read(arrayBuffer, { type: 'array' });
        // Obtener nombres de las hojas
        // this.sheetNames = this.workbook.SheetNames;
    }
}
export async function  loadTurnos() {
    /* Trae todos los elementos de la base de datos  */
    try {
        const res = await getTurnos();
        return res.data;
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}
export async function  loadItinerario() {
    try {
        /* Trae todos los elementos de la base de datos */
        const res = await getItinerario();
        return res.data;
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}
export async function  loadCambiosTurnos() {
    try {
        /* Trae todos los elementos de la base de datos */
        const res = await getCambioTurnos();
        return res.data;
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}
export async function  loadPersonales() {
    try {
        /* Trae todos los elementos de la base de datos */
        const res = await getPersonales();
        return res.data;
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}
export async function loadPersonal(id: string) {
    try {
        const res = await getPersonal(id);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
export async function loadPersonalSinDiagrama(id: string) {
    try {
        const res = await getPersonalSinDiagrama(id);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
export async function  loadNovedades() {
    try {
        const res = await getNovedades();
        return res.data;
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}
export function defaultPersonal(): IPersonal {
    return {
        _id: '',
        legajo: 0,
        apellido: '',
        nombres: '',
        turno: '',
        franco: 0,
        especialidad: '',
        dotacion: '',
        observaciones: '',
        orden: 0,
        conocimientos: {
            CML: false,
            CKD: false,
            RO: false,
            MPN: false,
            OL: false,
            LCI: false,
            ELEC: false,
            DUAL: false,
        },
        viewDetail: false,
    };
}
export function defaultTurnos(): ITurno {
    return {
        _id: '',
        turno: '',
        itinerario: '',
        circular: '',
        personal: '',
        toma: '',
        deja: '',
        dotacion: '',
        especialidad: '',
        ordenes: false,
        viewDetail: false,
        vueltas: [{} as Vueltas],
    }
}
export function defaultNovedad(): Novedad {
    return{
            _id: 0,
            fecha: '',
            legajo: 0 ,
            apellido: '',
            nombres: '',
            base: '',
            especialidad: '',
            turno: '',
            franco: '',
            tipoNovedad:'',
            fechaBaja:'',
            fechaAlta:'',
            HNA: false,
            detalle:'',
            viewDetail:false,
            novedadInactiva: false,

            remplazo: [],
            
    }
}
export function defaultPersonalSinDiagrama(): IPersonalSinDiagrama {
    return {
        _id: '',
        legajo: 0,
        Ciclo: 0,
        francoInicio: 0,
        HoraInicio: '',
        francoHasta: 0,
        HoraHasta: '',
        meses: {},
    };
}
export function defaultJornada(): Jornada {
    return {
        tren: '', 
        desde: '', 
        hasta: '', 
        disponibleHora: '', 
        tomo: '', 
        dejo: '', 
        totalHoras: '', 
        observaciones: '',
        editable: true,
        estilo: false, 
        nroNovedad: null
    };
}
export function formatearFecha(fechaString: string): string {
    const fecha: Date = new Date(fechaString);
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    const formatoFecha = new Intl.DateTimeFormat(
        "es-AR",
        opcionesDeFormato
    );

    return formatoFecha.format(fecha);
}
export function quitarDuplicados(lista: ITurno[],circularSeleccionada: String[]): ITurno[] {
    const mapa: Map<string, ITurno> = new Map();

    for (const elemento of lista) {
        // Utilizamos el ID como clave en el mapa
        if (!mapa.has(elemento.turno)) {
            mapa.set(elemento.turno, elemento);
        } else if (
            mapa.has(elemento.turno) &&
            circularSeleccionada.includes(elemento.circular)
        ) {
            mapa.set(elemento.turno, elemento);
        }
    }
    // Convertir los valores del mapa de nuevo a una lista
    return Array.from(mapa.values());
}
export async function guardarRegistro(today:Date,accion:string,turno?: ITurno,personal?: IPersonal,novedad?: Novedad, user?: User,ordenamiento?:Ordenamiento){
    // guardamos registro
    const registro: Registro = {
        usuario: window.localStorage.getItem("username") || "",
        fecha: today.toString(),
        accion: accion,
        turno:turno,
        personal: personal,
        novedad:novedad,
        user:user,
        ordenamiento:ordenamiento
    };
    await createRegistro(registro);
}
const diasDeLaSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
];
export function obtenerNumeroDia(dia: string):number {
    // Si se encuentra, devuelve el índice (0-6); de lo contrario, devuelve -1
    return diasDeLaSemana.findIndex((nombre) => nombre === dia);
}
export function obtenerDiaSemana(num:number):string{
    return diasDeLaSemana[num]
}
export function itinerarioType(fecha: Date) {
    if (fecha.getDay() === 0) {
        return "D";
    } else if (fecha.getDay() === 6) {
        return "S";
    } else {
        return "H";
    }
}