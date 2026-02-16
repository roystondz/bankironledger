const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { createAccountController, getUserAccountsController } = require("../controllers/account.controller");

const router = express.Router();

router.post("/",authMiddleware,createAccountController)

router.get("/",authMiddleware,getUserAccountsController)


module.exports = router;