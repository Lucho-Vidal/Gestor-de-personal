import { Router } from "express";
import { authJwt } from "../middlewares";
import * as personalSinDiagramaCtrl from "../controllers/tarjetaPersonalSinDiagrama.controller";

const router = Router();

router.get("/tarjetaPersonalSinDiagrama", [authJwt.verifyToken], personalSinDiagramaCtrl.getTarjetaPersonalesSinDiagrama);
router.get("/tarjetaPersonalSinDiagramaById/:id", [authJwt.verifyToken], personalSinDiagramaCtrl.getTarjetaPersonalSinDiagramaById);
// router.get("/tarjetaPersonalSinDiagramaPorLegajoYMes/:legajo/:mes", [authJwt.verifyToken], personalSinDiagramaCtrl.getTarjetaPersonalSinDiagramaPorLegajoYMes);
router.get("/tarjetaPersonalSinDiagramaPorLegajoYMes", [authJwt.verifyToken], personalSinDiagramaCtrl.getTarjetaPersonalSinDiagramaPorLegajoYMes);

router.post(
    "/tarjetaPersonalSinDiagrama",
    [authJwt.verifyToken, authJwt.isModerator],
    personalSinDiagramaCtrl.createTarjetaPersonalSinDiagrama
);

router.put(
    "/tarjetaPersonalSinDiagrama/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    personalSinDiagramaCtrl.updateTarjetaPersonalSinDiagrama
);
router.delete(
    "/tarjetaPersonalSinDiagrama/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    personalSinDiagramaCtrl.deleteTarjetaPersonalSinDiagramaById
);
export default router;