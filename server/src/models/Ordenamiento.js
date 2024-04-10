import { model, Schema } from "mongoose";

const OrdenamientoSchema = new Schema({
    fecha: String,
    tipo: String,
    personal: {},
    Tren: {},
    detalle: String,
},{
    timestamps: true
});
export default model("Ordenamiento",OrdenamientoSchema);