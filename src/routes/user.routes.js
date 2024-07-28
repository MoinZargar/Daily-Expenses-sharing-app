import { Router } from "express";
import {getUserDetails, loginUser, logoutUser, registerUser} from "../controllers/user.controllers.js"
import { verifyJwt } from "../middleware/auth.middleware.js"
const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJwt , logoutUser)
router.route("/info").post(verifyJwt,getUserDetails)
export default router