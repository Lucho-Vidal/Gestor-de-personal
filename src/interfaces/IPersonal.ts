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
    viewDetail:boolean;
}
export interface IConocimientos {
    CML: boolean;
    CKD: boolean;
    RO: boolean;
    MPN: boolean;
    OL: boolean;
    LCI: boolean;
    ELEC: boolean;
    DUAL: boolean;
}
