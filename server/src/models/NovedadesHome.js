import { model, Schema } from "mongoose";

const novedadHomeSchema = new Schema({
    fecha: String,
    titulo: String,
    description: String,
    activo: Boolean,
    img: String,
},{
    timestamps: true
});
export default model("NovedadHome",novedadHomeSchema);