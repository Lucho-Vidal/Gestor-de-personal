import Personal from "../models/Personal";

export const getPersonales = async (req, res) => {
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

export const getPersonal = async (req, res) => {
    try {
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

export const createPersonal = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la solicitud
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

        // Crear un nuevo objeto Personal con los datos proporcionados
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

        // Guardar el nuevo objeto Personal en la base de datos
        const savedPersonal = await newPersonal.save();

        // Responder con código de estado 201 y la ubicación del nuevo recurso
        res.status(201).location(`/api/personal/${savedPersonal._id}`).json(savedPersonal);
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la creación
        console.error("Error al crear un nuevo registro de Personal:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const updatePersonalById = async (req, res) => {
    try {
        // Actualizar el registro específico por ID
        const updatePersonal = await Personal.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        // Verificar si se encontró el registro
        if (!updatePersonal) {
            // No se encontró el registro, responder con código 404
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        // Responder con el registro actualizado
        res.status(200).json(updatePersonal);
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la actualización
        console.error("Error al actualizar el registro de Personal por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const deletePersonalById = async (req, res) => {
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
