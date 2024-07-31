import { Router } from "express";
import {getUserDetails, loginUser, logoutUser, refreshAccessToken, registerUser} from "../controllers/user.controllers.js"
import { verifyJwt } from "../middleware/auth.middleware.js"
const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJwt , logoutUser)
router.route("/info").get(verifyJwt,getUserDetails)
router.route("/refresh-token").post(refreshAccessToken)
export default router