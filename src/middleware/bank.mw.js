module.exports = {
  // ---- Bank Accounts ----
  checkAccounts: async (req, res, next) => {
    const { accountID } = req.params;
    const { accounts } = req.user;
    const accountExist = accounts.find(
      (acc) => acc._id.toString() === accountID
    );

    if (!accountExist)
      return res.status(404).json({
        message: `The bank account with the account ID: ${accountID} could NOT be found.`,
      });

    next();
  },
  checkAccountTransactions: async (req, res, next) => {
    const { accountID, transactionID } = req.params;
    const { accounts } = req.user;
    const account = accounts.find((acc) => acc._id.toString() === accountID);
    const transactionExist = account.transactions.find(
      (t) => t._id.toString() === transactionID
    );

    if (!transactionExist)
      return res.status(404).json({
        message: `The bank account with the account ID: ${accountID} does NOT contain a transaction with the ID: ${transactionID}`,
      });

    next();
  },

  // ---- Cards ----
  checkCards: async (req, res, next) => {
    const { cardID } = req.params;
    const { cards } = req.user;
    const cardExist = cards.find((c) => c._id.toString() === cardID);

    if (!cardExist)
      return res.status(404).json({
        message: `The card with the ID: ${cardID} could NOT be found.`,
      });

    next();
  },
  checkCardTransactions: async (req, res, next) => {
    const { cardID, transactionID } = req.params;
    const { cards } = req.user;
    const card = cards.find((card) => card._id.toString() === cardID);
    const transactionExist = card.transactions.find(
      (t) => t._id.toString() === transactionID
    );

    if (!transactionExist)
      return res.status(404).json({
        message: `The card with the card ID: ${cardID} does NOT contain a transaction with the ID: ${transactionID}`,
      });

    next();
  },
};
