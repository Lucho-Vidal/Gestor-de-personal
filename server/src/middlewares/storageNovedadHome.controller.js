import multer from 'multer';
import path from 'path';
import fs from 'fs';
import novedadHome from '../models/NovedadesHome'; // Ruta correcta hacia tu modelo

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/noticias/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Crea el directorio si no existe
        }
        cb(null, uploadPath);
    },
    filename: async (req, file, cb) => {
        try {
            const noticia = await novedadHome.findById(req.params.id); // Busca la noticia por su ID
            if (!noticia) {
                return cb(new Error('Noticia not found'), null);
            }

            const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error('wrong file type'), false);
            }

            const fileName = `${noticia._id}${path.extname(file.originalname)}`;
            const filePath = path.join('uploads/noticias', fileName);

            // Si existe un archivo con el mismo nombre, se elimina
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            noticia.img = filePath; // Guarda la ruta en el campo `img`
            await noticia.save();   // Guarda los cambios en la noticia

            cb(null, fileName); // Devuelve el nombre del archivo
        } catch (error) {
            cb(error, null);
        }
    },
});

const upload = multer({ storage: storage });

export default upload;

