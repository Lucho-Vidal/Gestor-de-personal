import {Schema, model} from 'mongoose'

const via = new Schema({
    Legajo: {
        type:Number,
        required: true,
        unique: true
    },
    Pczz: String,
    Pcak: String,
    Pctybq: String,
    Pcqllp: String,
    Zzcñ: String,
    Tyhdo: String,
    Cñmn: String,
    Cñlb: String,
    Pcqlbq: String,
    Pctylp: String,
    Tyjg: String, 
    Cñgl: String,
    Akchc: String,
    Akmpn: String,
    Cñolbb: String,
    Cñol: String,
    Olbb: String,
    Gipx: String,
    Universitario: String,
});

export default model("Via", via);
