import { Schema, model } from "mongoose";

const turnoSchema = new Schema({
    
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
    circular: {
        type: String
    },
    personal: {
        type: String,
    },
    toma: {
        type: String,
        trim: true,
    },
    deja: {
        type: String,
        trim: true,
    },
    dotacion: {
        type: String,
    },
    especialidad: {
        type: String,
    },
    ordenes: {
        type: Boolean,
    },
    vueltas:[]
},
    {
        versionKey: false,
    }
);

export default model("ITurno", turnoSchema);