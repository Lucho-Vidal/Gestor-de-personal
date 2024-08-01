import {Schema, model} from 'mongoose'

const via = new Schema({
    _id: String,
    Legajo: {
        type:Number,
        required: true,
        unique: true
    },
    Pczz: Date,
    Pcak: Date,
    Pctybq: Date,
    Pcqllp: Date,
    Zzcñ: Date,
    Tyhdo: Date,
    Cñmn: Date,
    Cñlb: Date,
    Pcqlbq: Date,
    Pctylp: Date,
    Tyjg: Date, 
    Cñgl: Date,
    Akchc: Date,
    Akmpn: Date,
    Cñolbb: Date,
    Cñol: Date,
    Olbb: Date,
    Gipx: Date,
    Universitario: Date,
});

export default model("Via", via);
