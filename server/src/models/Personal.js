import {Schema, model} from 'mongoose'

const personalSchema = new Schema({
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

export default model("Personal", personalSchema);
