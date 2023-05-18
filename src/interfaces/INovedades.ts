export interface Novedad {
    _id: number;
    legajo: number;
    apellido: string;
    nombres: string;
    puesto: string;
    base: string;
    tipoNovedad:string;
    fechaBaja:Date;
    fechaAlta:Date;
    HNA:boolean;
    Detalle:string;
    remplazo:Remplazo;
}

interface Remplazo{
    legajo:number;
    inicioRelevo:Date;
    finRelevo:Date;
}