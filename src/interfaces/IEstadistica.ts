// export interface IEstadistica{
//     _id: string;
//     conductorElec: ITipoAusentismo;
//     conductorDiesel: ITipoAusentismo;
//     ayudanteConductor: ITipoAusentismo;
//     ayudanteHabilitado: ITipoAusentismo;
//     guardaElec: ITipoAusentismo;
//     guardaDiesel: ITipoAusentismo;
//     totales: ITipoAusentismo;
// }

// export interface ITipoAusentismo{
//     fisico: number;
//     diagramas: number;
//     servicioIrregular: number;
//     Enfermos: number;
//     res558: number;
//     licenciaAnual: number;
//     escTecnica: number;
//     ausenteDisciplinarios: number;
//     legales: number;
//     otrosMotivos: number;
//     ausentismo: number;
//     franco: number;
// }

export interface ITipoAusentismo {
    fisico: number;
    diagramas: number;
    servicioIrregular: number;
    enfermos: number;
    res558: number;
    licenciaAnual: number;
    escTecnica: number;
    ausenteDisciplinarios: number;
    legalesConvencionales: number;
    otrosMotivos: number;
    ausentismo: number;
    porAusDiag:number;
    porAusFisico:number;
    franco: number;
}

// Clase que implementa la interfaz con valores predeterminados
export class TipoAusentismo implements ITipoAusentismo {
    fisico = 0;
    diagramas = 0;
    servicioIrregular = 0;
    enfermos = 0;
    res558 = 0;
    licenciaAnual = 0;
    escTecnica = 0;
    ausenteDisciplinarios = 0;
    legalesConvencionales = 0;
    otrosMotivos = 0;
    ausentismo = 0;
    porAusDiag = 0;
    porAusFisico = 0;
    franco = 0;
}

// Modificación de la otra interfaz para usar la clase `TipoAusentismo`
export interface IEstadistica {
    conductorElec: ITipoAusentismo;
    conductorDiesel: ITipoAusentismo;
    ayudanteConductor: ITipoAusentismo;
    ayudanteHabilitado: ITipoAusentismo;
    guardaElec: ITipoAusentismo;
    guardaDiesel: ITipoAusentismo;
    totales: ITipoAusentismo;
    [key: string]: ITipoAusentismo;
}
