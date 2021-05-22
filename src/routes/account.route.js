const express = require("express");
const router = express.Router();

const {
  getAccountInfo,
  debitAccount,
  creditAccount,
} = require("../controller/account.controller");

router.get("/", getAccountInfo);
router.post("/debit", debitAccount);
router.post("/credit", creditAccount);

module.exports = router;
