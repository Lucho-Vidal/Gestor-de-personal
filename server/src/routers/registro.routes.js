import { Router } from "express";
import { authJwt } from "../middlewares";
import * as registroCtrl from "../controllers/registro.controller";

const router = Router();

router.get(
    "/registros",
    [authJwt.verifyToken,authJwt.isAdmin],
    registroCtrl.getRegistros
);

router.post(
    "/registros",
    [authJwt.verifyToken,authJwt.isAdmin],
    registroCtrl.createRegistro
)
export default router;