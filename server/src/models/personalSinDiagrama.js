import {Schema, model} from 'mongoose'

const fichaSchema = new Schema({
  legajo: { type: Number, required: true },
  Ciclo: { type: Number },
  francoInicio: { type: Number },
  HoraInicio: { type: String },
  francoHasta: { type: Number },
  HoraHasta: { type: String },
});

export default model("personalSinDiagrama", fichaSchema);