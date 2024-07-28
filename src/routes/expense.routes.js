import { Router } from "express";
import { addExpense, balanceSheet, individualExpense, overallExpense  } from "../controllers/expense.controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js"

const router = Router()

//secured routes
router.route("/addExpense").post(verifyJwt , addExpense)
router.route("/individualExpense").post(verifyJwt , individualExpense)
router.route("/overallExpense").post(verifyJwt , overallExpense)
router.route("/balanceSheet").post(verifyJwt , balanceSheet)
export default router