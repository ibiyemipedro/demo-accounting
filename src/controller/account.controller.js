const { userId } = require("../db/account.db");
const { JsonResponse } = require("../utils/apiResponse");
const {
  validateTransactionObject,
} = require("../validations/account.validation");

const AccountService = require("../services/account.service");
const accountInstance = new AccountService();

exports.getAccountInfo = async (req, res, next) => {
  try {
    const accountInfo = await accountInstance.getAccountInfo(userId);

    return JsonResponse(
      res,
      200,
      "Account info fetched successfully",
      accountInfo
    );
  } catch (error) {
    next(error);
  }
};

exports.creditAccount = async (req, res, next) => {
  try {
    const { error } = validateTransactionObject(req.body);
    if (error) return JsonResponse(res, 400, error.details[0].message);

    if (req.body.transactionType === "debit")
      return JsonResponse(res, 400, "Wrong Transaction Type");

    const updatedAccount = await accountInstance.creditUser(req.body);
    return JsonResponse(
      res,
      200,
      "Credit Transaction successfull",
      updatedAccount
    );
  } catch (error) {
    next(error);
  }
};

exports.debitAccount = async (req, res, next) => {
  try {
    const { error } = validateTransactionObject(req.body);
    if (error) return JsonResponse(res, 400, error.details[0].message);

    if (req.body.transactionType === "credit")
      return JsonResponse(res, 400, "Wrong Transaction Type");

    const updatedAccount = await accountInstance.debitUser(req.body);
    return JsonResponse(
      res,
      200,
      "Debit Transaction successfull",
      updatedAccount
    );
  } catch (error) {
    next(error);
  }
};
