import { CambioTurno } from "@/interfaces/ICambioTurno";
import { Novedad, Remplazo } from "@/interfaces/INovedades";
import { IPersonal } from "@/interfaces/IPersonal";
import { ITurno } from "@/interfaces/ITurno";
import { Itinerario } from "@/interfaces/Itinerario";
import { getCambioTurnos } from "@/services/cambioTurnoService";
import { getItinerario } from "@/services/itinerarioService";
import { getNovedades } from "@/services/novedadesService";
import { getPersonales } from "@/services/personalService";
import { getTurnos } from "@/services/turnosService";
import { AxiosError } from "axios";
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
                console.log(cambiado?.apellido);

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
export function filtrarPorTurno(itinerario: string,listaTurnos: ITurno[],circularSeleccionada: string[],tren: string) {
    const turnos: ITurno[] = [];
    listaTurnos.forEach((diag: ITurno) => {
        if (
            diag.turno.toLowerCase().includes(tren.toLowerCase()) &&
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
        let titular: IPersonal;
        turno = turno.trim();

        if (
            turno.indexOf(".") !== -1 &&
            !turno.toLowerCase().includes("prog")
        ) {
            const indexPunto = turno.indexOf(".");
            const diaLab = Number(turno[indexPunto + 1]);
            const diag = turno.split(".")[0];
            const franco = dia_laboral(diaLab, fecha.getDay());

            [titular] = personales.filter((personal) => {
                return (
                    personal.turno === diag &&
                    Number(personal.franco) === franco
                );
            });
        } else {
            [titular] = personales.filter(
                (personal) =>
                    personal.turno.toLowerCase() === turno.toLowerCase()
            );
        }

        return {
            turno: turno,
            legajo: titular.legajo || 0,
            nombres: titular
                ? `${titular.apellido} ${titular.nombres}`
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
export async function  loadNovedades() {
    try {
        const res = await getNovedades();
        return res.data;
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}