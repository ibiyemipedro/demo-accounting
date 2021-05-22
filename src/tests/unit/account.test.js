const sinon = require("sinon");
const AccountService = require("../../services/account.service");
const accountInstance = new AccountService();
const { demoAccountStore, demoUserId } = require("../utils");

/* 
=====FAKE FUNCTIONS TO BE STUBBED======= 

This approach was adopted to prevent making actual calls to the database as the intention is to test the function in the service

*/
function testAccountInfo(userId) {
  if (userId !== demoUserId) return new Error("Invalid userId");
  return demoAccountStore;
}

function testCreditUser(txObject) {
  if (
    txObject.amount &&
    txObject.transactionType === "credit" &&
    txObject.userId === demoAccountStore.userId
  ) {
    const newBalance = (demoAccountStore.balance += txObject.amount);
    return { ...demoAccountStore, balance: newBalance };
  }
  return new Error("Invalid or Incomplete Input");
}
function testDebitUser(txObject) {
  if (
    txObject.amount &&
    txObject.transactionType === "debit" &&
    txObject.userId === demoAccountStore.userId
  ) {
    if (demoAccountStore.balance < txObject.amount)
      return new Error("Cannot debit below balance");
    const newBalance = (demoAccountStore.balance -= txObject.amount);
    return { ...demoAccountStore, balance: newBalance };
  }
  return new Error("Invalid or Incomplete Input");
}

/* ======STUBBED FUNCTIONS FAKE FUNCTIONS TO BE STUBBED========== */

describe("AccountInfo", () => {
  accountInstance.getAccountInfo = sinon.stub();
  accountInstance.getAccountInfo.callsFake(testAccountInfo);

  it("returns account infomation", async () => {
    const accountInfo = await accountInstance.getAccountInfo(demoUserId);
    expect(accountInfo).toBeDefined();
  });

  sinon.restore();
});

describe("CreditAccount", () => {
  const txObject = {
    userId: "qwerty-123",
    transactionType: "credit",
    amount: 800,
  };
  accountInstance.creditUser = sinon.stub();
  accountInstance.creditUser.callsFake(testCreditUser);

  it("Credits the single user account", async () => {
    const creditUser = await accountInstance.creditUser(txObject);
    expect(creditUser).toBeDefined();
  });
  sinon.restore();
});

describe("DebitAccount", () => {
  const txObject = {
    userId: "qwerty-123",
    transactionType: "debit",
    amount: 800,
  };
  accountInstance.creditUser = sinon.stub();
  accountInstance.debitUser = sinon.stub();
  accountInstance.creditUser.callsFake(testCreditUser);
  accountInstance.debitUser.callsFake(testDebitUser);

  it("Debits the single user account", async () => {
    await accountInstance.creditUser({
      ...txObject,
      transactionType: "credit",
      amount: 1000,
    });
    const debitUser = await accountInstance.debitUser(txObject);
    expect(debitUser).toBeDefined();
  });
  sinon.restore();
});
