const TRANSACTION_TYPES = Object.freeze({
  CREDIT: "CREDIT",
  DEBIT: "DEBIT",
});

const STATUS_TYPES = Object.freeze({
  COMPLETED: "COMPLETED",
  PENDING: "PENDING",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
});

module.exports = {
  TRANSACTION_TYPES,
  STATUS_TYPES,
};
