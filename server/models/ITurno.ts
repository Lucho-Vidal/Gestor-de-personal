import {Document, Schema, model } from "mongoose";

interface Turno extends Document{
    turno:string,
    itinerario: string,
    personal: string,
    toma: string,
    deja: string,
    vueltas: Array<Vueltas>
}
interface Vueltas{
    vuelta: number,
    tren:number,
    refer: string,
    origen: string,
    sale: string,
    destino: string,
    llega: string,
    observaciones: string,
}

const turnoSchema = new Schema<Turno>({
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
    vueltas:[]
},
    {
        versionKey: false,
    }
);

export default model("ITurno", turnoSchema);
