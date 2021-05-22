const { userId } = require("../db/account.db");
const { JsonResponse } = require("../utils/apiResponse");

const TransactionService = require("../services/transaction.service");
const transactionInstance = new TransactionService();

exports.getUserTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionInstance.getTransactions(userId);
    return JsonResponse(
      res,
      200,
      "Transactions fetched successfully",
      transactions
    );
  } catch (error) {
    next(error);
  }
};
