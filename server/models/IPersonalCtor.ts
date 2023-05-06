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
}
interface IConductor extends IPersonal{
    conocimiento:IConocimientos;
}

interface IConocimientos {
    CML: boolean;
    CKD: boolean;
    RO: boolean;
    MPN: boolean;
    OL: boolean;
    LCI: boolean;
    ELEC: boolean;
}
const conductorSchema = new Schema<IConductor>({
    legajo: {
        type:Number,
        required: true
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
    }
});

export default model<IConductor>("Conductores", conductorSchema);
