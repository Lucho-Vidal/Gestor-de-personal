import { IPersonal } from "./IPersonal";
import { Vueltas } from "./ITurno";

export interface Ordenamiento{
    _id: string;
    fecha:string;
    tipo: string;
    personal: IPersonal;
    trenes: Array<Vueltas>,
    detalle: string;
    
}
// export interface trenes{
//     tren: number;
//     desde:string;
//     sale: string;
//     hasta:string;
//     llega: string;
// }