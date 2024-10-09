const bankRouter = require("express-promise-router")();
const {
  addNewAccount,
  deleteAccount,
  addNewAccountTransaction,
  deleteAccountTransaction,
  addNewCard,
  deleteCard,
  addNewCardTransaction,
  deleteCardTransaction,
} = require("../controllers/bank.ct");
const {
  checkAccounts,
  checkCards,
  checkAccountTransactions,
  checkCardTransactions,
} = require("../middleware/bank.mw");
const {
  bankAccountValidator,
  transactionValidator,
  cardValidator,
} = require("../middleware/validator.mw");

// ---- Bank Accounts ----

// POST: Add New Bank Account
bankRouter.post("/accounts", bankAccountValidator, addNewAccount);

// DELETE: Delete Bank Account
bankRouter.delete("/accounts/:accountID", checkAccounts, deleteAccount);

// POST: Add New Transaction to Bank Account
bankRouter.post(
  "/accounts/:accountID/transactions",
  checkAccounts,
  transactionValidator,
  addNewAccountTransaction
);

// DELETE: Delete Transaction from Bank Account
bankRouter.delete(
  "/accounts/:accountID/transactions/:transactionID",
  checkAccounts,
  checkAccountTransactions,
  deleteAccountTransaction
);

// ---- Cards ----

// POST: Add New Card
bankRouter.post("/cards", cardValidator, addNewCard);

// DELETE: Delete Card
bankRouter.delete("/cards/:cardID", checkCards, deleteCard);

// POST: Add New Transaction to Card
bankRouter.post(
  "/cards/:cardID/transactions",
  checkCards,
  transactionValidator,
  addNewCardTransaction
);

// DELETE: Delete Transaction from Card
bankRouter.delete(
  "/cards/:cardID/transactions/:transactionID",
  checkCards,
  checkCardTransactions,
  deleteCardTransaction
);

module.exports = bankRouter;
