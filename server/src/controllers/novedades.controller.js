import Novedades from "../models/Novedades";

export const getNovedades = async (req, res) => {
    const novedades = await Novedades.find();
    res.json(novedades);
};
export const getUltimaNovedad = async (req, res) => {
    const novedades = await Novedades.find().sort({ $natural: -1 }).limit(1);
    res.json(novedades);
};
export const getNovedad = async (req, res) => {
    const novedad = await Novedades.findById(req.params.id);
    res.json(novedad);
};
export const createNovedad = async (req, res) => {
    const {
        _id,
        legajo,
        apellido,
        nombres,
        puesto,
        base,
        tipoNovedad,
        fechaBaja,
        fechaAlta,
        HNA,
        detalle,
        remplazo,
    } = req.body;
    const newNovedad = new Novedades({
        _id,
        legajo,
        apellido,
        nombres,
        puesto,
        base,
        tipoNovedad,
        fechaBaja,
        fechaAlta,
        HNA,
        detalle,
        remplazo,
    });
    const savedNovedad = await newNovedad.save();
    res.json(savedNovedad);
};
export const updateNovedadById = async (req, res) => {
    const updateNovedad = await Novedades.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.json(updateNovedad);
};
export const deleteNovedadById = async (req, res) => {
    const novedad = await Novedades.findByIdAndDelete(req.params.id);
    res.json(novedad);
};
