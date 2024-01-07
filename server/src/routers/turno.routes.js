import { Router } from "express";
import { authJwt } from "../middlewares";
import * as turnoCtrl from "../controllers/turno.controller";

const router = Router();

router.get("/turnos", 
    [authJwt.verifyToken],
    turnoCtrl.getTurnos
);
router.get(
    "/turno/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    turnoCtrl.getTurno
);
router.post(
    "/turnos",
    [authJwt.verifyToken, authJwt.isAdmin],
    turnoCtrl.createTurno
);
router.put(
    "/turnos",
    [authJwt.verifyToken, authJwt.isAdmin],
    turnoCtrl.updateTurno
);
router.delete(
    "/turno/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    turnoCtrl.deleteTurno
);

export default router;
