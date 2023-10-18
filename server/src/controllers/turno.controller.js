import Turno from "../models/Turno";

export const getTurnos = async (req, res) => {
    const turnos = await Turno.find();
    res.json(turnos);
};
