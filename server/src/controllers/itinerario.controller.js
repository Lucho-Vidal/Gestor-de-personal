import Itinerario from "../models/Itinerario";

export const getItinerario = async (req, res) => {
    const itinerario = await Itinerario.find();
    res.json(itinerario);
};
