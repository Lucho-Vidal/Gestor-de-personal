import { Schema, model } from "mongoose";

const indiceSchema = new Schema({
    turno: {
        type: String,
        required: true,
        trim: true,
    },
    itinerario: {
        type: String,
        required: true,
        trim: true,
    },
    personal: {
        type: String,
        required: true,
        trim: true,
    },
    toma: {
        type: String,
        required: true,
        trim: true,
    },
    deja: {
        type: String,
        required: true,
        trim: true,
    },
    diagrama:{
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
    }
},
    {
        versionKey: false,
    }
);

export default model("Indice", indiceSchema);
