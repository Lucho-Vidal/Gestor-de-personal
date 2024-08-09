import upload from './storage.controller.js'; 
import DatoPersonal from '../models/DatosPersonales.js'; 
import path from 'path';


export const uploadFile = async (req, res) => {
    try {
        upload.single('myFile')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            // Accede al archivo subido a través de req.file
            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const datoPersonal = await DatoPersonal.findById(req.params.id);
            if (!datoPersonal) {
                return res.status(404).json({ error: 'DatoPersonal not found' });
            }
            // Obtener el nombre del archivo y la extensión
            const fileName = `${datoPersonal.Legajo}${path.extname(file.originalname)}`;
            const filePath = path.join('uploads', fileName);

            // Actualizar el campo Img en el documento de DatoPersonal
            datoPersonal.Img = filePath;
            await datoPersonal.save();

            res.status(200).json(datoPersonal);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
