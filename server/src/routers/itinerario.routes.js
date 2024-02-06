import { Router } from "express";
import { authJwt } from "../middlewares";
import * as itinerarioCtrl from '../controllers/itinerario.controller'

const router = Router();

router.get(
    "/itinerario",
    [authJwt.verifyToken],
    itinerarioCtrl.getItinerario
);

router.get(
    "/itinerario-paginado",
    [authJwt.verifyToken],
    itinerarioCtrl.getItinerarioPaginado
);

export default router;