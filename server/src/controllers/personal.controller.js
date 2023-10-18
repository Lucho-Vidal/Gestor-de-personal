import Personal from "../models/Personal";

export const getPersonales = async (req, res) => {
    const personales = await Personal.find();
    res.status(200).json(personales);
};

export const getPersonal = async (req, res) => {
    const personal = await Personal.findById(req.params.id);
    res.status(200).json(personal);
};

export const createPersonal = async (req, res) => {
    const {
        legajo,
        apellido,
        nombres,
        turno,
        franco,
        puesto,
        especialidad,
        dotacion,
        observaciones,
        orden,
        conocimientos,
    } = req.body;
    const newPersonal = new Personal({
        legajo,
        apellido,
        nombres,
        turno,
        franco,
        puesto,
        especialidad,
        dotacion,
        observaciones,
        orden,
        conocimientos,
    });
    const savedPersonal = await newPersonal.save();
    res.status(200).json(savedPersonal);
};

export const updatePersonalById = async (req, res) => {
    const updatePersonal = await Personal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatePersonal);
};

export const deletePersonalById = async (req, res) => {
    const personal = await Personal.findByIdAndDelete(req.params.id);
    res.status(200).json(personal);
};
