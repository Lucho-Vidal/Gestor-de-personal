import { Router } from "express";
import { authJwt } from "../middlewares";
import * as novedadCtrl from "../controllers/novedadesHome.controller";
import { uploadNoticiaImg } from '../controllers/uploadsNovedadHome.controller';

const router = Router();

router.get(
    "/novedadesHome",
    [authJwt.verifyToken,authJwt.isModerator],
    novedadCtrl.getNovedadesHome
);
router.get(
    "/novedadesHome/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    novedadCtrl.getNovedadHome
);
router.post(
    "/novedadesHome",
    [authJwt.verifyToken,authJwt.isAdmin],
    novedadCtrl.createNovedadHome
);
router.put(
    "/novedadesHome/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    novedadCtrl.updateNovedadHomeById
);
router.delete(
    "/novedadesHome/:id",
    [authJwt.verifyToken,authJwt.isAdmin],
    novedadCtrl.deleteNovedadHomeById
);

// Ruta para subir imagen de noticia
router.post('/novedadesHome/:id/upload', uploadNoticiaImg);

export default router;