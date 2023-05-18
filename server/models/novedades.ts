import { Document, model, Schema } from "mongoose";


interface INovedad extends Document {
    _id:number;
    legajo: number;
    apellido: string;
    nombres: string;
    puesto: string;
    base: string;
    tipoNovedad:string;
    fechaBaja:Date;
    fechaAlta:Date;
    HNA:boolean;
    detalle:string;
    remplazo:Remplazo;
}

interface Remplazo{
    legajo:number;
    inicioRelevo:Date;
    finRelevo:Date;
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
    puesto: String,
    base: String,
    tipoNovedad: String,
    fechaBaja:{
        type:Date,
        required: true
    },
    fechaAlta:Date,
    HNA: Boolean,
    detalle: String,
});
export default model<INovedad>("Novedad",novedadSchema);