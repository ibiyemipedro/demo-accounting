const AsyncLock = require("async-lock");
const lock = new AsyncLock();

const { accountStore } = require("../db/account.db");

const TransactionService = require("./transaction.service");
const transactionInstance = new TransactionService();

const {
  STATUS_TYPES,
  TRANSACTION_TYPES,
} = require("../constants/appConstants");

class AccountService {
  /**
   * Get account info
   * @returns Users - Object
   */
  getAccountInfo(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (lock.isBusy(userId)) throwError("Service Unavailable", 503);

        resolve({ ...accountStore });
      } catch (error) {
        error.source = "Get account info";
        return reject(error);
      }
    });
  }

  /**
   * Credit Account
   * @returns Users - Object
   */
  creditUser({ userId, amount }) {
    return new Promise(async (resolve, reject) => {
      lock
        .acquire(userId, () => {
          accountStore.balance += amount;
          accountStore.updatedAt = new Date();

          transactionInstance.createTransaction({
            amount,
            userId,
            transactionType: TRANSACTION_TYPES.CREDIT,
            status: STATUS_TYPES.COMPLETED,
          });

          return resolve({ ...accountStore });
        })
        .catch((error) => {
          error.source = "Credit account service";
          return reject(error);
        });
    });
  }

  /**
   * Debit Account
   * @returns Users - Object
   */
  debitUser({ userId, amount }) {
    return new Promise(async (resolve, reject) => {
      lock
        .acquire(userId, () => {
          if (accountStore.balance < amount)
            return reject({
              code: 400,
              msg: "Insufficient balace to perform a debit",
            });
          accountStore.balance -= amount;
          accountStore.updatedAt = new Date();
          transactionInstance.createTransaction({
            amount,
            userId,
            transactionType: TRANSACTION_TYPES.DEBIT,
            status: STATUS_TYPES.COMPLETED,
          });

          return resolve({ ...accountStore });
        })
        .catch((error) => {
          error.source = "Debit account ervice";
          return reject(error);
        });
    });
  }
}

module.exports = AccountService;
