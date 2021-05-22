const express = require("express");
const router = express.Router();

const { getUserTransactions } = require("../controller/transaction.controller");

router.get("/", getUserTransactions);

module.exports = router;
