import { Router } from "express";
import { authJwt } from "../middlewares";
const router = Router();

import * as authCtrl from '../controllers/auth.controller'
import { verifySignup } from "../middlewares";

router.post('/signup',[
    verifySignup.checkDuplicateUsernameOrEmail,
    verifySignup.checkRolesExisted,
    authJwt.verifyToken,
    authJwt.isAdmin
]
,authCtrl.singUp)

router.post(
    '/signin',
    authCtrl.singIn
)

//verifyToken or requireRefreshToken
router.get('/refresh',[
    authJwt.verifyToken
],authCtrl.refreshToken)

export default router;