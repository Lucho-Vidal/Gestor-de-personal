import { Router } from "express";
const router = Router()

import * as userCtrl from '../controllers/user.controller'
import { authJwt } from "../middlewares";

router.get('/users',[
    authJwt.verifyToken,
    authJwt.isAdmin
],userCtrl.getUsers)

router.get("/user/:id",[
    authJwt.verifyToken,
    authJwt.isAdmin
],userCtrl.getUser)

router.put("/user/:id",[
    authJwt.verifyToken,
    authJwt.isAdmin
],userCtrl.updateUser)

export default router;