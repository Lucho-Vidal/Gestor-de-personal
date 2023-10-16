import { Schema, model, Document } from "mongoose";

interface IPersonal extends Document {
    legajo: number;
    apellido: string;
    nombres: string;
    turno: string;
    franco: number;
    especialidad: string;
    dotacion: string;
    observaciones: string;
    orden: number;
    //conocimientos:IConocimientos;
}
interface IConductor extends IPersonal{
    conocimientos:IConocimientos;
}

interface IConocimientos {
    CML: string;
    CKD: string;
    RO: string;
    MPN: string;
    OL: string;
    LCI: string;
    ELEC: string;
}
const personalSchema = new Schema<IConductor>({
    legajo: {
        type:Number,
        required: true,
        unique: true
    },
    apellido: {
        type: String,
        required: true
    },
    nombres: {
        type: String,
        required: true
    },
    turno: {
        type: String,
    },
    franco: {
        type: Number,
        
    },
    especialidad: {
        type: String,
        required: true
    },
    dotacion: {
        type: String,
    },
    observaciones: {
        type: String,
        
    },
    orden: {
        type: Number,
    },
    conocimientos: {
        CML: String,
        CKD: String,
        RO: String,
        MPN: String,
        OL: String,
        LCI: String,
        ELEC: String,
        DUAL: String
    }
});

export default model<IConductor>("Personal", personalSchema);
