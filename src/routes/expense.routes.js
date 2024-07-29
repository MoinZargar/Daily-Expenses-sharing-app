import { Router } from "express";
import { addExpense, balanceSheet, individualExpense, overallExpense  } from "../controllers/expense.controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js"

const router = Router()

//secured routes
router.route("/addExpense").post(verifyJwt , addExpense)
router.route("/individualExpense").get(verifyJwt , individualExpense)
router.route("/overallExpense").get(verifyJwt , overallExpense)
router.route("/balanceSheet").get(verifyJwt , balanceSheet)
export default router