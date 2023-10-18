import { Router } from "express";
import { authJwt } from "../middlewares";
import * as novedadCtrl from "../controllers/novedades.controller";

const router = Router();

router.get(
    "/novedades",
    [authJwt.verifyToken,authJwt.isModerator],
    novedadCtrl.getNovedades
);
router.get(
    "/novedades/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    novedadCtrl.getNovedad
);
router.get(
    "/ultimaNovedad",
    [authJwt.verifyToken,authJwt.isModerator],
    novedadCtrl.getUltimaNovedad
);
router.post(
    "/novedades",
    [authJwt.verifyToken,authJwt.isModerator],
    novedadCtrl.createNovedad
);
router.put(
    "/novedades/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    novedadCtrl.updateNovedadById
);
router.delete(
    "/novedades/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    novedadCtrl.deleteNovedadById
);

export default router;