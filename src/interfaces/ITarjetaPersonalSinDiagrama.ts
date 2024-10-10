export interface Mes {
  mes: string; // El mes (e.g., '2024-08')
  days: {
    [key: string]: Jornada; // Permite acceder a los días del mes usando una cadena como clave
  };
}

export interface ITarjetaPersonalSinDiagrama {
  _id: string;
  legajo: number;
  Ciclo: number;
  francoInicio: number;
  HoraInicio: string;
  francoHasta: number;
  HoraHasta: string;
  mes: Mes; // Un solo mes por documento
}

export interface Jornada {
  tren: string;
  desde: string;
  hasta: string;
  disponibleHora: string;
  tomo: string;
  dejo: string;
  totalHoras: string;
  dia_laboral: number | null;
  observaciones: string;
  editable: boolean;
  estilo: boolean;
  [key: string]: any;
  nroNovedad: number | null;
}