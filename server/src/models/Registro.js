import { Schema, model } from "mongoose";
// import Personal from "./Personal";
// import Novedades from "./Novedades";
// import Turno from "./Turno";

const registroSchema = new Schema({
    usuario: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    accion: String,
    turno: {},
    personal: {},
    novedad: {},
    user:{},
    ordenamiento:{}
});

export default model("Registro", registroSchema);
