const express = require('express');
const router = express.Router();
const { createTransaction, createInitalTransaction } = require('../controllers/transaction.controller');
const { authMiddleware, systemUserMiddleware } = require('../middlewares/auth.middleware');

router.post('/',authMiddleware, createTransaction);

router.post("/system/inital-funds", systemUserMiddleware, createInitalTransaction);

module.exports = router;