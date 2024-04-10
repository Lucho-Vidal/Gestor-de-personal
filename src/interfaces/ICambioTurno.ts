export interface CambioTurno{
    _id: number;
    fechaCambio:string;
    fecha:string;
    personal: Array<Personal>
}

export interface Personal{
    legajo:number;
    apellido: string;
    nombres: string;
    base: string;
    especialidad: string;
    turno: string;
    franco: string;
}