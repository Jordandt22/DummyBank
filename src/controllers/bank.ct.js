const User = require("../models/db");

const roundNums = (curBalance, transaction) => {
  const value = curBalance + transaction;

  return value < 0
    ? Math.ceil(value * 100) / 100
    : Math.floor(value * 100) / 100;
};

module.exports = {
  // ---- Bank Accounts ----
  addNewAccount: async (req, res) => {
    const { newAccount } = req.body;
    const { id, accounts } = req.user;

    // Add New Bank Account
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        accounts: [
          ...accounts,
          {
            startDate: newAccount.startDate ? newAccount.startDate : new Date(),
            ...newAccount,
            currentBalance: newAccount.initialBalance,
            transactions: [],
          },
        ],
      },
      {
        new: true,
      }
    );

    res.status(200).json({ user: updatedUser });
  },
  deleteAccount: async (req, res) => {
    const { accountID } = req.params;
    const { id, accounts } = req.user;
    const updatedAccounts = accounts.filter((acc) => {
      return acc._id.toString() !== accountID;
    });

    // Add New Bank Account
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        accounts: [...updatedAccounts],
      },
      {
        new: true,
      }
    );

    res.status(200).json({ user: updatedUser });
  },
  addNewAccountTransaction: async (req, res) => {
    const { accountID } = req.params;
    const { newTransaction } = req.body;
    const { id, accounts } = req.user;
    const updatedAccounts = accounts.map((acc) => {
      if (acc._id.toString() === accountID) {
        if (acc.currentBalance + newTransaction.amount < 0)
          return res.status(422).json({
            message: `Your balance for the account (ID: ${accountID}) is NOT enough to perform this transaction.`,
          });

        acc.transactions.push({ date: new Date(), ...newTransaction });
        acc.currentBalance = roundNums(
          acc.currentBalance,
          newTransaction.amount
        );
      }

      return acc;
    });

    // Add New Bank Account
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        accounts: [...updatedAccounts],
      },
      {
        new: true,
      }
    );

    res.status(200).json({ user: updatedUser });
  },
  deleteAccountTransaction: async (req, res) => {
    const { accountID, transactionID } = req.params;
    const { id, accounts } = req.user;
    const updatedAccounts = accounts.map((acc) => {
      if (acc._id.toString() === accountID) {
        const updatedTransactions = acc.transactions.filter((t) => {
          if (t._id.toString() === transactionID) {
            // Reverse the Transaction
            acc.currentBalance = roundNums(acc.currentBalance, t.amount * -1);
          }

          return t._id.toString() !== transactionID;
        });

        acc.transactions = updatedTransactions;
      }

      return acc;
    });

    // Add New Bank Account
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        accounts: [...updatedAccounts],
      },
      {
        new: true,
      }
    );

    res.status(200).json({ user: updatedUser });
  },

  // ---- Cards ----
  addNewCard: async (req, res) => {
    const { newCard } = req.body;
    const { id, cards } = req.user;

    // Add New Card
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        cards: [
          ...cards,
          {
            startDate: newCard.startDate ? newCard.startDate : new Date(),
            ...newCard,
            transactions: [],
          },
        ],
      },
      {
        new: true,
      }
    );

    res.status(200).json({ user: updatedUser });
  },
  deleteCard: async (req, res) => {
    const { cardID } = req.params;
    const { id, cards } = req.user;
    const updatedCards = cards.filter((c) => {
      return c._id.toString() !== cardID;
    });

    // Add New Bank Account
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        cards: [...updatedCards],
      },
      {
        new: true,
      }
    );

    res.status(200).json({ user: updatedUser });
  },
  addNewCardTransaction: async (req, res) => {
    const { cardID } = req.params;
    const { newTransaction } = req.body;
    const { id, cards } = req.user;
    const updatedCards = cards.map((card) => {
      if (card._id.toString() === cardID) {
        if (card.currentBalance + newTransaction.amount * -1 > card.cardLimit)
          return res.status(422).json({
            message: `This transaction will exceed this card's limit with the ID: ${cardID}.`,
          });

        card.transactions.push({ date: new Date(), ...newTransaction });
        card.currentBalance = roundNums(
          card.currentBalance,
          newTransaction.amount * -1
        );
      }

      return card;
    });

    // Add New Bank Account
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        cards: [...updatedCards],
      },
      {
        new: true,
      }
    );

    res.status(200).json({ user: updatedUser });
  },
  deleteCardTransaction: async (req, res) => {
    const { cardID, transactionID } = req.params;
    const { id, cards } = req.user;
    const updatedCards = cards.map((card) => {
      if (card._id.toString() === cardID) {
        const updatedTransactions = card.transactions.filter((t) => {
          if (t._id.toString() === transactionID) {
            // Reverse the Transaction
            card.currentBalance = roundNums(card.currentBalance, t.amount);
          }

          return t._id.toString() !== transactionID;
        });

        card.transactions = updatedTransactions;
      }

      return card;
    });

    // Add New Bank Account
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        cards: [...updatedCards],
      },
      {
        new: true,
      }
    );

    res.status(200).json({ user: updatedUser });
  },
};
