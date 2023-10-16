export interface IPersonal {
    _id: string;
    legajo: number;
    apellido: string;
    nombres: string;
    turno: string;
    franco: number;
    especialidad: string;
    dotacion: string;
    observaciones: string;
    orden: number;
    conocimientos: IConocimientos;
}
export interface IConocimientos {
    CML: string;
    CKD: string;
    RO: string;
    MPN: string;
    OL: string;
    LCI: string;
    ELEC: string;
    DUAL: string;
}
