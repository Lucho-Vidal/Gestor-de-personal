export interface Novedad {
    id: null;
    legajo: number;
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