import upload from '../middlewares/storageNovedadHome.controller'; // Tu middleware multer
import Noticia from '../models/NovedadesHome';

// Controlador para subir imagen de noticia
export const uploadNoticiaImg = async (req, res) => {
    try {
        upload.single('noticiaImg')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const noticia = await Noticia.findById(req.params.id);
            if (!noticia) {
                return res.status(404).json({ error: 'Noticia not found' });
            }

            res.status(200).json(noticia); // Devuelve la noticia actualizada
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


