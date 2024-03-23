import { model, Schema } from "mongoose";

const cambioTurnoSchema = new Schema({
    _id: {
        type:Number,
        required: true
    },
    personal: []
},{
    timestamps: true
});
export default model("CambioTurno",cambioTurnoSchema);