import Personal from "../models/personalSinDiagrama";
import mongoose from 'mongoose';

export const getPersonalesSinDiagrama = async (req, res) => {
    try {
        // Obtener todos los registros de la colección Personal
        const personales = await Personal.find();
        

        // Responder con los registros obtenidos
        res.json(personales);
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la búsqueda
        console.error("Error al obtener los registros de Personal:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const getPersonalSinDiagrama = async (req, res) => {
    try {
        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        // Obtener un registro específico por ID
        const personal = await Personal.findById(req.params.id);

        // Verificar si se encontró el registro
        if (!personal) {
            // No se encontró el registro, responder con código 404
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        // Responder con el registro encontrado
        res.json(personal);
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la búsqueda
        console.error("Error al obtener el registro de Personal por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const getPersonalSinDiagramaPorLegajoYPeriodo = async (req, res) => {
    try {
        // Obtener legajo y periodo de los parámetros de la consulta
        const { legajo, periodo } = req.query;

        // Validar que legajo y periodo existan en la consulta
        if (!legajo || !periodo) {
            return res.status(400).json({ error: 'Faltan parámetros legajo o periodo' });
        }

        // Convertir legajo a número para asegurar el tipo correcto
        const legajoNumber = Number(legajo);

        // Verificar si la conversión a número fue exitosa
        if (isNaN(legajoNumber)) {
            return res.status(400).json({ error: 'Legajo debe ser un número' });
        }

        // Buscar en la base de datos por legajo y periodo
        const personal = await Personal.find({ legajo: legajoNumber, periodo: periodo });

        // Verificar si se encontró algún registro
        if (personal.length === 0) {
            return res.status(404).json({ error: 'No se encontraron registros con los parámetros proporcionados' });
        }

        // Responder con el registro encontrado
        res.json(personal);
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la búsqueda
        console.error("Error al obtener el registro de Personal por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const createPersonalSinDiagrama = async (req, res) => {
    try {
        const newPersonal = new Personal(req.body);

        await newPersonal.save();

        res.status(201).json(newPersonal);
    } catch (error) {
        console.error("Error al crear PersonalSinDiagrama:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar PersonalSinDiagrama por legajo y periodo
export const updatePersonalSinDiagrama = async (req, res) => {
    try {
        const { legajo, periodo } = req.params;

        const updatedPersonal = await Personal.findOneAndUpdate(
            { legajo, periodo },
            req.body,
            { new: true }
        );

        if (!updatedPersonal) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        res.json(updatedPersonal);
    } catch (error) {
        console.error("Error al actualizar PersonalSinDiagrama:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const deletePersonalSinDiagramaById = async (req, res) => {
    try {
        // Eliminar el registro específico por ID
        const personal = await Personal.findByIdAndDelete(req.params.id);

        // Verificar si se encontró el registro
        if (!personal) {
            // No se encontró el registro, responder con código 404
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        // Responder con código de estado 204 (Sin contenido)
        res.status(204).end();
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la eliminación
        console.error("Error al eliminar el registro de Personal por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
