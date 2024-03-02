export interface Novedad {
    _id: number;
    fecha: string;
    legajo: number;
    apellido: string;
    nombres: string;
    base: string;
    especialidad: string;
    turno: string;
    franco: string;
    tipoNovedad:string;
    fechaBaja:string;
    fechaAlta:string;
    HNA:boolean;
    detalle:string;
    viewDetail:boolean;
    novedadInactiva: boolean;
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
    inicioRelevo:string;
    finRelevo:string;
    HNA:boolean;
}