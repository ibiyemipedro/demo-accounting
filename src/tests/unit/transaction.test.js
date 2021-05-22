const sinon = require("sinon");
const TransactionService = require("../../services/transaction.service");
const transactionInstance = new TransactionService();
const { demoTransactionHistoryStore } = require("../utils");

/* 
=====FAKE FUNCTIONS TO BE STUBBED======= 

This approach was adopted to prevent making actual calls to the database as the intention is to test the function in the service

*/

function testCreateTransaction(txObject) {
  if (txObject.amount && txObject.transactionType && txObject.userId) {
    demoTransactionHistoryStore.push(txObject);
    return demoTransactionHistoryStore;
  }
  return new Error("Invalid or Incomplete Input");
}
function testTransactionHistory() {
  return demoTransactionHistoryStore;
}

/* ======STUBBED FUNCTIONS FAKE FUNCTIONS TO BE STUBBED========== */

describe("CreateTransaction", () => {
  transactionInstance.createTransaction = sinon.stub();
  transactionInstance.createTransaction.callsFake(testCreateTransaction);

  it("creates a transaction", async () => {
    const createdHistory = await transactionInstance.createTransaction({
      txRef: "bP_l0MMR2",
      amount: 800,
      userId: "qwerty-123",
      transactionType: "CREDIT",
      status: "COMPLETED",
      createdAt: 1621673864194,
      updatedAt: 1621673864194,
    });
    expect(createdHistory).toBeDefined();
  });

  sinon.restore();
});

describe("TransactionHistory", () => {
  transactionInstance.getTransactions = sinon.stub();
  transactionInstance.getTransactions.callsFake(testTransactionHistory);

  it("Fetches transaction histories", async () => {
    const txHistory = await transactionInstance.getTransactions();
    expect(txHistory).toBeDefined();
  });
  sinon.restore();
});
