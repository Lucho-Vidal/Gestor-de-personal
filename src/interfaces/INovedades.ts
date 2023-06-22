export interface Novedad {
    _id: number;
    legajo: number;
    apellido: string;
    nombres: string;
    base: string;
    especialidad: string;
    turno: string;
    franco: number;
    tipoNovedad:string;
    fechaBaja:string;
    fechaAlta:string;
    HNA:boolean;
    detalle:string;
    remplazo: Array<Remplazo>;
}

export interface Remplazo{
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