import { Document, model, Schema } from "mongoose";

interface INovedad extends Document {
    _id:number;
    legajo: number;
    apellido: string;
    nombres: string;
    base: string;
    especialidad: string;
    turno: string;
    franco: string;
    tipoNovedad:string;
    fechaBaja:string;
    fechaAlta:string;
    HNA:boolean;
    detalle:string;
    remplazo: Array<Remplazo>;
}

interface Remplazo{
    legajo:number;
    apellido: string;
    nombres: string;
    base: string;
    especialidad: string;
    turno: string;
    franco: string;
    inicioRelevo:string;
    finRelevo:string;
    HNA:boolean;
}

const novedadSchema = new Schema<INovedad>({
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
    remplazo: [] 
});
export default model<INovedad>("Novedad",novedadSchema);