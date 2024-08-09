import {Schema, model} from 'mongoose'

const datosPersonalSchema = new Schema({
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
        type: String,
    },
    Mail: {
        type: String,
    },
    GrupoSanguíneo: {
        type: String,
    },
    Img: {
        type: String,
    },
    certificadoIdoneidad:{
        type: String,
    },
    aptoMedico: {
        type: String,
    },
});

export default model("Datos_Personale", datosPersonalSchema);
