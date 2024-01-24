import Itinerario from "../models/Itinerario";

export const getItinerario = async (req, res) => {
    const itinerario = await Itinerario.find();
    res.json(itinerario);
};

export const getItinerarioPaginado = async (req, res) => {
    const { page, pageSize } = req.query;

    try {
        const result = await Itinerario.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        // Manejar el error y enviar una respuesta de error al cliente
        res.status(500).json({ error: 'Error al obtener datos del itinerario.' });
    }
}
