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

export default router;