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