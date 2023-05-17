import { Document, model, Schema } from "mongoose";


interface INovedad extends Document {
    legajo: number;
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
    legajo: Number,
    tipoNovedad: String,
    fechaBaja:Date,
    fechaAlta:Date,
    HNA: Boolean,
    detalle: String,
});
export default model<INovedad>("Novedad",novedadSchema);