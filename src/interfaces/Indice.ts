export interface Indice {
    id: null;
    turno: string;
    itinerario: string;
    personal: string;
    toma: string;
    deja: string;
    diagrama: Diagrama;
}

interface Diagrama {
    vuelta: number;
    tren: number;
    refer: string;
    origen: string;
    sale: string;
    destino: string;
    llega: string;
    observaciones: string;
}