import { Router } from "express";
import { authJwt } from "../middlewares";
import * as cambioCtrl from "../controllers/ordenamiento.controller";

const router = Router();

router.get(
    "/ordenamientos",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.getOrdenamientos
);
router.get(
    "/ordenamientos/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.getOrdenamiento
);
router.post(
    "/ordenamientos",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.createOrdenamiento
);
router.put(
    "/ordenamientos/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.updateOrdenamientoById
);
router.delete(
    "/ordenamientos/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.deleteOrdenamientoById
);

export default router;