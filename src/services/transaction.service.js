const { transactionHistoryStore } = require("../db/account.db");
const shortid = require("shortid");

class TransactionService {
  /**
   * Create a transaction
   * @param amount string
   * @param transactionType string
   * @param userId string
   * @param status string
   */
  createTransaction({ amount, userId, transactionType, status }) {
    return new Promise(async (resolve, reject) => {
      try {
        const transaction = {
          txRef: shortid.generate(),
          amount,
          userId,
          transactionType,
          status,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        transactionHistoryStore.push(transaction);
        return resolve();
      } catch (error) {
        error.source = "Create a transaction";
        return reject(error);
      }
    });
  }

  /**
   * Get User Transactions
   * @returns Users - Object
   */
  getTransactions(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions = transactionHistoryStore.filter(
          (transaction) => transaction.userId === userId
        );
        return resolve([...transactions]);
      } catch (error) {
        error.source = "Get User Transactions";
        return reject(error);
      }
    });
  }
}

module.exports = TransactionService;
