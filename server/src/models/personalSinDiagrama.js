import { Schema, mongoose } from 'mongoose';

// Definir el esquema de Jornada
const JornadaSchema = new Schema({
  tren: { type: String },
  desde: { type: String },
  hasta: { type: String },
  disponibleHora: { type: String },
  tomo: { type: String },
  dejo: { type: String },
  totalHoras: { type: String },
  observaciones: { type: String },
  editable: { type: Boolean },
  nroNovedad: { type: Number, default: null }
});

// Definir el esquema de Mes
const MesSchema = new Schema({
  mes: { type: String, required: true }, // El mes (e.g., '2024-08')
  legajo: { type: Number, required: true },
  Ciclo: { type: Number },
  francoInicio: { type: Number },
  HoraInicio: { type: String },
  francoHasta: { type: Number },
  HoraHasta: { type: String },
  days: { type: Map, of: JornadaSchema, default: {} }
});

// Crear el modelo basado en el esquema
const MesPersonal = mongoose.model('MesPersonal', MesSchema);

module.exports = MesPersonal;

