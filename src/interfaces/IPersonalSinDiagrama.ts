export interface Mes {
    days: {
        [key: string]: Jornada; // Permite acceder a los días del mes usando una cadena como clave
    };
}
export interface IPersonalSinDiagrama {
    _id: string;
    legajo: number;
    Ciclo: number;
    francoInicio: number;
    HoraInicio: string;
    francoHasta: number;
    HoraHasta: string;
    meses: {
        [key: string]: Mes; // Cada mes está indexado por una cadena (e.g., '2024-08')
    };
}

export interface Jornada { 
    tren: string; 
    desde: string; 
    hasta: string; 
    disponibleHora: string; 
    tomo: string; 
    dejo: string; 
    totalHoras: string; 
    observaciones: string; 
    estilo:boolean;
    nroNovedad:number|null;
}