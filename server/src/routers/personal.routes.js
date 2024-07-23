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

export default router;