import { Novedad } from './INovedades';
import { IPersonal } from './IPersonal';
import { ITurno } from './ITurno';
import { User } from './IUser';

export interface Registro {
    usuario: string;
    fecha: string;
    accion: string;
    viewDetail?: boolean;
    turno?: ITurno;
    personal?: IPersonal;
    novedad?: Novedad;
    user?: User
}