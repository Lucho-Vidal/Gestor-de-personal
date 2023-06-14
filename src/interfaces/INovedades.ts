export interface Novedad {
    _id: number;
    legajo: number;
    apellido: string;
    nombres: string;
    base: string;
    especialidad: string;
    turno: string;
    franco: string;
    tipoNovedad:string;
    fechaBaja:Date;
    fechaAlta:Date;
    HNA:boolean;
    Detalle:string;
    remplazo: Remplazo[];
}

interface Remplazo{
    legajo:number;
    apellido: string;
    nombres: string;
    base: string;
    especialidad: string;
    turno: string;
    franco: string;
    inicioRelevo:Date;
    finRelevo:Date;
    HNA:boolean;
}