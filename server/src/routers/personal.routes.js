import { Router } from "express";
import { authJwt } from "../middlewares";
import * as personalCtrl from "../controllers/personal.controller";

const router = Router();

router.get("/Personal", [authJwt.verifyToken], personalCtrl.getPersonales);
router.get("/Personal/:id", [authJwt.verifyToken], personalCtrl.getPersonal);
router.post(
    "/Personal",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.createPersonal
);
router.post(
    '/Personal-multiple', 
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.createMultiplePersonal);
router.put(
    "/Personal/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.updatePersonalById
);
router.delete(
    "/Personal/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.deletePersonalById
);

router.delete(
    "/Personal-multiple",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.deleteMultiplePersonal
);

//--------------------------------------------------------------------------------------------
//Datos de Personales
router.get("/DatoPersonal", [authJwt.verifyToken], personalCtrl.getDatosPersonales);
router.get("/DatoPersonal/:id", [authJwt.verifyToken], personalCtrl.getDatoPersonal);
router.post(
    "/DatoPersonal",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.createDatoPersonal
);
router.put(
    "/DatoPersonal/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.updateDatoPersonalById
);
router.delete(
    "/DatoPersonal/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.deleteDatoPersonalById
);
//--------------------------------------------------------------------------------------------
//Conocimientos de Vias
router.get("/vias", [authJwt.verifyToken], personalCtrl.getConocimientoVias);
router.get("/vias/:id", [authJwt.verifyToken], personalCtrl.getConocimientoVia);
router.post(
    "/vias",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.createConocimientoVias
);
router.put(
    "/vias/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.updateConocimientoVias
);
router.delete(
    "/vias/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    personalCtrl.deleteConocimientoViasById
);
export default router;