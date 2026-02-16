const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { createAccountController, getUserAccountsController, getUserAccountBalanceByIdController } = require("../controllers/account.controller");

const router = express.Router();

router.post("/",authMiddleware,createAccountController)

router.get("/",authMiddleware,getUserAccountsController)


router.get("/balance/:accountId",authMiddleware,getUserAccountBalanceByIdController)

module.exports = router;