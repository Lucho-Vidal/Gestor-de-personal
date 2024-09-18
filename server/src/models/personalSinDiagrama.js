import {Schema, mongoose} from 'mongoose'

// Definir el esquema de Jornada
const JornadaSchema = new Schema({
    tren: { type: String },
    desde: { type: String },
    hasta: { type: String },
    disponibleHora: { type: String },
    tomo: { type: String },
    dejo: { type: String },
    totalHoras: { type: String },
    observaciones: { type: String },
    editable: {type:Boolean}

});

// Definir el esquema de Meses
const MesesSchema = new Schema({
    // Cada día del mes es un sub-documento de Jornada
    days: { type: Map, of: JornadaSchema, default: {} }
});

// Definir el esquema principal de IPersonalSinDiagrama
const PersonalSinDiagramaSchema = new Schema({
    legajo: { type: Number },
    Ciclo: { type: Number },
    francoInicio: { type: Number },
    HoraInicio: { type: String },
    francoHasta: { type: Number },
    HoraHasta: { type: String },
    meses: {
        type: Map,
        of: MesesSchema,
        default: {} // Para asegurarse de que meses esté siempre inicializado
    }
});

// Crear el modelo basado en el esquema
const PersonalSinDiagrama = mongoose.model('PersonalSinDiagrama', PersonalSinDiagramaSchema);

module.exports = PersonalSinDiagrama;
