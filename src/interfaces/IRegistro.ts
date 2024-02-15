import { Novedad } from './INovedades';
import { IPersonal } from './IPersonal';
import { ITurno } from './ITurno';

export interface Registro {
    usuario: string;
    fecha: string;
    accion: string;
    turno?: ITurno;
    personal?: IPersonal;
    novedad?: Novedad;
}