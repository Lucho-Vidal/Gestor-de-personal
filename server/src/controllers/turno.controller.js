import Turno from "../models/Turno";

export const getTurnos = async (req, res) => {
    const turnos = await Turno.find();
    res.json(turnos);
};

export const getTurno = async (req,res) =>{
    const turno = await Turno.findById(req.params.id);
    res.json(turno);
}

export const createTurno = async (req,res) => {
    const {
        turno,
        itinerario,
        circular,
        personal,
        toma,
        deja,
        vueltas
    } = req.body;
    const newTurno = new Turno({
        turno,
        itinerario,
        circular,
        personal,
        toma,
        deja,
        vueltas
    })
    const savedTurno = await newTurno.save();
    res.json(savedTurno);
}

export const updateTurno = async (req,res) => {
    const updateTurno = await Turno.findByIdAndUpdate(
        req.params.id,
        req.params.body,
        {
            new: true,
        }
    );
    res.json(updateTurno);
}

export const deleteTurno = async (req,res) =>{
    const turno = await Turno.findByIdAndDelete(req.params.id);
    res.json(turno);
}