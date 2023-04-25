import { Schema, model } from "mongoose";

const indiceSchema = new Schema({
    ordenado: {
        type: Number,
        required: true,
        trim: true,
    },
    vuelta:{
        type: Number,
        required: true,
        trim: true,
    },
    tren:{
        type: Number,
        required: true,
        trim: true,
    },
    refer: {
        type: String,
        required: true,
        trim: true,
    },
    turno: {
        type: String,
        required: true,
        trim: true,
    },
    origen: {
        type: String,
        required: true,
        trim: true,
    },
    sale: {
        type: String,
        required: true,
        trim: true,
    },
    destino: {
        type: String,
        required: true,
        trim: true,
    },
    llega: {
        type: String,
        required: true,
        trim: true,
    },
    observaciones: {
        type: String,
        required: true,
        trim: true,
    },
},
    {
        versionKey: false,
    }
);

export default model("Indice", indiceSchema);
