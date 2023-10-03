export interface ITurno {
    id: null;
    turno: string;
    itinerario: string;
    personal: string;
    toma: string;
    deja: string;
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