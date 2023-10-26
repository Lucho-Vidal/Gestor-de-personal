export interface Descendente {
    tren: string,
    desde: string,
    hasta: string,
    llega: string,
    CtTurno: string,
    CtNombre: string,
    CtSale: string,
    CtHora: string,
    CtObs: string,
    GdTurno: string,
    GdNombre: string,
    GdSale: string,
    GdHora: string,
    GdObs: string
}

export interface Ascendente {
    tren: number,
    sale: string,
    origen: string,
    destino: string,
    paraTren: string,
    CtTurno: string,
    CtNombre: string,
    CtLlegaCon: string,
    CtRelevo: string,
    GdTurno: string,
    GdNombre: string,
    GdLlegaCon: string,
    GdRelevo: string,
}