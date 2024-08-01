import {Schema, model} from 'mongoose'

const datosPersonalSchema = new Schema({
    _id: String,
    Legajo: {
        type:Number,
        required: true,
        unique: true
    },
    Dni: {
        type: Number,
    },
    Nacionalidad: {
        type: String,
    },
    Calle: {
        type: String,
    },
    Nro: {
        type: Number,
        
    },
    Piso: {
        type: String,
    },
    Depto: {
        type: String,
    },
    Postal: {
        type: Number,
        
    },
    Localidad: {
        type: String,
    },
    Tel1: {
        type: String,
    },
    Tel2: {
        type: String,
    },
    Nacimiento: {
        type: String,
    },
    Sexo: {
        type: Number,
    },
    Mail: {
        type: String,
    },
    GrupoSanguíneo: String,
    Img: String,
});

export default model("Datos_Personale", datosPersonalSchema);
