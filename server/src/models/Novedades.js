import { model, Schema } from "mongoose";

const novedadSchema = new Schema({
    _id: {
        type:Number,
        required: true
    },
    legajo: {
        type:Number,
        required: true
    },
    apellido: String,
    nombres: String,
    base: String,
    especialidad: String,
    turno: String,
    franco: String,
    tipoNovedad: String,
    fechaBaja:{
        type:String,
        required: true
    },
    fechaAlta:String,
    HNA: Boolean,
    detalle: String,
    novedadInactiva: Boolean,
    remplazo: [] 
},{
    timestamps: true
});
export default model("Novedad",novedadSchema);