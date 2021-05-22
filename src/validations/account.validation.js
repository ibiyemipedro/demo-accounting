const Joi = require("joi");

function validateTransactionObject(transactionObject) {
  const Schema = Joi.object().keys({
    userId: Joi.string().required(),
    transactionType: Joi.string().valid("credit", "debit").required(),
    amount: Joi.number().required(),
  });

  return Schema.validate(transactionObject);
}

module.exports = {
  validateTransactionObject,
};
