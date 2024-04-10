import Registro from "../models/Registro.js"

export const getRegistros = async (req,res) => {
    try{
        const registros = await Registro.find();

        res.status(200).json(registros);
    }catch(error){
        console.error("Error al obtener novedades:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const createRegistro = async (req,res) =>{
    try {
        const {
            usuario,
            fecha,
            accion,
            turno,
            personal,
            novedad,
            ordenamiento
        }=req.body;

        const newRegistro = new Registro({
            usuario,
            fecha,
            accion,
            turno,
            personal,
            novedad,
            ordenamiento
        });

        const savedRegistro = await newRegistro.save();

        res.status(201).json(savedRegistro);
    } catch (error) {
        console.error("Error al crear la novedad:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}