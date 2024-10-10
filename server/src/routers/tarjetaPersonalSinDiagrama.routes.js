import { Router } from "express";
import { authJwt } from "../middlewares";
import * as personalSinDiagramaCtrl from "../controllers/tarjetaPersonalSinDiagrama.controller";

const router = Router();

router.get("/tarjetaPersonalSinDiagrama", [authJwt.verifyToken], personalSinDiagramaCtrl.getTarjetaPersonalesSinDiagrama);
router.get("/tarjetaPersonalSinDiagrama/:id", [authJwt.verifyToken], personalSinDiagramaCtrl.getTarjetaPersonalSinDiagrama);
router.get("/tarjetaPersonalSinDiagramaPorPeriodo/:legajo/:periodo", [authJwt.verifyToken], personalSinDiagramaCtrl.getTarjetaPersonalSinDiagramaPorLegajo);
router.post(
    "/tarjetaPersonalSinDiagrama",
    [authJwt.verifyToken, authJwt.isModerator],
    personalSinDiagramaCtrl.createTarjetaPersonalSinDiagrama
);

router.put(
    "/tarjetaPersonalSinDiagrama/:legajo",
    [authJwt.verifyToken, authJwt.isModerator],
    personalSinDiagramaCtrl.updateTarjetaPersonalSinDiagrama
);
router.delete(
    "/tarjetaPersonalSinDiagrama/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    personalSinDiagramaCtrl.deleteTarjetaPersonalSinDiagramaById
);
export default router;