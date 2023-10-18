import { Router } from "express";
import { authJwt } from "../middlewares";
import * as turnoCtrl from "../controllers/turno.controller";

const router = Router();

router.get("/turnos", [authJwt.verifyToken], turnoCtrl.getTurnos);

export default router;