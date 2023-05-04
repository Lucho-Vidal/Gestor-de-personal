import { Schema, model, Document } from "mongoose";

interface IPersonal extends Document {
    legajo: number;
    apellido: string;
    nombre: string;
    turno: string;
    franco: string;
    especialidad: string;
    dotacion: string;
    observaciones: string;
    orden: number;
}
interface IConductor extends IPersonal{
    conocimiento:conocimientos;
}

type conocimientos = {
    CML: boolean;
    CKD: boolean;
    RO: boolean;
    MPN: boolean;
    OL: boolean;
    LCI: boolean;
    ELEC: boolean;
};
const conductorSchema = new Schema<IConductor>({
    legajo: {
        type:Number,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    turno: {
        type: String,
        required: true
    },
    franco: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    },
    dotacion: {
        type: String,
        required: true
    },
    observaciones: {
        type: String,
        required: true
    },
    orden: {
        type: Number,
        required: true
    }
});

export default model<IConductor>("Conductores", conductorSchema);
