export interface ITurno {
    _id: string;
    turno: string;
    itinerario: string;
    circular: string;
    personal: string;
    toma: string;
    deja: string;
    dotacion: string;
    especialidad: string;
    ordenes: boolean;
    viewDetail:boolean;
    vueltas: Vueltas[];
}

interface Vueltas {
    vuelta: number;
    tren: number;
    refer: string;
    origen: string;
    sale: string;
    destino: string;
    llega: string;
    observaciones: string;
}