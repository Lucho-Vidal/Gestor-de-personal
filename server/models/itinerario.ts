import { Schema, model } from "mongoose";

const itinerarioSchema = new Schema({
    TREN: {
        type: Number,
        required: true,
        trim: true,
    },
    PC:{
        type: String,
        required: true,
        trim: true,
    },
    ALL:{
        type: String,
        required: true,
        trim: true,
    },
    RE: {
        type: String,
        required: true,
        trim: true,
    },
    TY: {
        type: String,
        required: true,
        trim: true,
    },
    BO: {
        type: String,
        required: true,
        trim: true,
    },
    GW: {
        type: String,
        required: true,
        trim: true,
    },
    AK: {
        type: String,
        required: true,
        trim: true,
    },
    CY: {
        type: String,
        required: true,
        trim: true,
    },
    FV: {
        type: String,
        required: true,
        trim: true,
    },
    BQ: {
        type: String,
        required: true,
        trim: true,
    },
    LLV: {
        type: String,
        required: true,
        trim: true,
    },
    MG: {
        type: String,
        required: true,
        trim: true,
    },
    ZZ: {
        type: String,
        required: true,
        trim: true,
    },
    QL: {
        type: String,
        required: true,
        trim: true,
    },
    BZ: {
        type: String,
        required: true,
        trim: true,
    },
    HD: {
        type: String,
        required: true,
        trim: true,
    },
    VE: {
        type: String,
        required: true,
        trim: true,
    },
    OA: {
        type: String,
        required: true,
        trim: true,
    },
    LP: {
        type: String,
        required: true,
        trim: true,
    }
},
    {
        versionKey: false,
    }
);

export default model("Itinerario", itinerarioSchema);
