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

export interface IDatoPersonal {
    _id: string;
    Legajo: number;
    Dni: number;
    Nacionalidad: string;
    Calle: string;
    Nro: number;
    Piso: string;
    Depto: string;
    Postal: number;
    Localidad: string;
    Tel1: string;
    Tel2: string;
    Nacimiento: string;
    Sexo: number;
    Mail: string;
    GrupoSanguíneo: string;
    Img: string;
    certificadoIdoneidad: string;
    aptoMedico: string;
}

export interface IConocimientosVias {
    _id: string;
    Legajo: number;
    Pczz: string;
    Pcak: string;
    Pctybq: string;
    Pcqllp: string;
    Zzcñ: string;
    Tyhdo: string;
    Cñmn: string;
    Cñlb: string;
    Pcqlbq: string;
    Pctylp: string;
    Tyjg: string; 
    Cñgl: string;
    Akchc: string;
    Akmpn: string;
    Cñolbb: string;
    Cñol: string;
    Olbb: string;
    Gipx: string;
    Universitario: string;
}