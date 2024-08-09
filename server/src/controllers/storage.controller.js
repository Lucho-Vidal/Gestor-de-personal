import multer from 'multer';
import path from 'path';
import fs from 'fs';
import DatoPersonal from '../models/DatosPersonales'; // Asegúrate de que la ruta sea correcta

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: async (req, file, cb) => {
        try {
            const datoPersonal = await DatoPersonal.findById(req.params.id);
            if (!datoPersonal) {
                return cb(new Error('DatoPersonal not found'), null);
            }

            const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error('wrong file type'), false);
            }

            const fileName = `${datoPersonal.Legajo}${path.extname(file.originalname)}`;
            const filePath = path.join('uploads', fileName);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            datoPersonal.Img = filePath;
            await datoPersonal.save();

            cb(null, fileName);
        } catch (error) {
            cb(error, null);
        }
    },
});

const upload = multer({ storage: storage });

export default upload;
