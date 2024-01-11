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
        CML: Boolean,
        CKD: Boolean,
        RO: Boolean,
        MPN: Boolean,
        OL: Boolean,
        LCI: Boolean,
        ELEC: Boolean,
        DUAL: Boolean
    }
});

export default model("Personal", personalSchema);
