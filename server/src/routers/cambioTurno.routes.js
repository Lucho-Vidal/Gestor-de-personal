import { Router } from "express";
import { authJwt } from "../middlewares";
import * as cambioCtrl from "../controllers/cambioTurno.controller";

const router = Router();

router.get(
    "/cambioTurno",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.getCambioTurnos
);
router.get(
    "/cambioTurno/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.getCambioTurno
);
router.get(
    "/ultimoCambioTurno",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.getUltimaCambioTurno
);
router.post(
    "/cambioTurno",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.createCambioTurno
);
router.put(
    "/cambioTurno/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.updateCambioTurnoById
);
router.delete(
    "/cambioTurno/:id",
    [authJwt.verifyToken,authJwt.isModerator],
    cambioCtrl.deleteCambioTurnoById
);

export default router;