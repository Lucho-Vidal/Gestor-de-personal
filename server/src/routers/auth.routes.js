import { Router } from "express";
const router = Router();

import * as authCtrl from '../controllers/auth.controller'
import { verifySignup } from "../middlewares";
import { authJwt } from "../middlewares";
import { changePassword } from "../controllers/user.controller"

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

router.put("/change-password", authJwt.verifyToken, changePassword);



export default router;