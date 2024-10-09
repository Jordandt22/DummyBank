// Transaction Enums
const transactionCategories = {
  PURCHASE: "PURCHASE",
  DEPOSIT: "DEPOSIT",
  TRANSFER: "TRANSFER",
  OTHER: "OTHER",
  PAYMENT: "PAYMENT",
};

const bankAccountTypes = {
  CHECKING: "CHECKING",
  SAVINGS: "SAVINGS",
};

const cardTypes = {
  CREDIT: "CREDIT",
};

module.exports = { transactionCategories, bankAccountTypes, cardTypes };
