export interface IConductor {
    legajo: number;
    apellido: string;
    nombre: string;
    turno: string;
    franco: string;
    especialidad: string;
    dotacion: string;
    observaciones: string;
    orden: number;
    conocimientos: IConocimientos;
}

export interface IConocimientos {
    CML: boolean;
    CKD: boolean;
    RO: boolean;
    MPN: boolean;
    OL: boolean;
    LCI: boolean;
    ELEC: boolean;
}
