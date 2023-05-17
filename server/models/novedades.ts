import { Document, model, Schema } from "mongoose";


interface INovedad extends Document {
    legajo: number;
    tipoNovedad:string;
    fechaBaja:Date;
    fechaAlta:Date;
    HNA:boolean;
    Detalle:string;
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
    Detalle: String,
});
export default model<INovedad>("Novedad",novedadSchema);