import { Schema, model } from "mongoose";

const itinerarioSchema = new Schema({
    TREN: {
        type: Number,
        required: true,
        trim: true,
    },
    itinerario: String,
    estaciones:[],
    horarios:[],

},
    {
        versionKey: false,
    }
);

export default model("Itinerario", itinerarioSchema);