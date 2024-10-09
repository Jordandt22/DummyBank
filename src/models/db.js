const mongoose = require("mongoose");
const {
  cardTypes,
  bankAccountTypes,
  transactionCategories,
} = require("./enums");
const connect = mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@dummybankcluster.uhllk.mongodb.net/BankInfo?retryWrites=true&w=majority&appName=DummyBankCluster`
);

// Check if database connected
connect
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log("Database cannot be connected.", error);
  });

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  category: {
    type: String,
    enum: [
      transactionCategories.PURCHASE,
      transactionCategories.TRANSFER,
      transactionCategories.DEPOSIT,
      transactionCategories.PAYMENT,
      transactionCategories.OTHER,
    ],
  },
});

// Bank Account Schema
const BankAccountSchema = new mongoose.Schema({
  type: {
    type: String,
    enums: [bankAccountTypes.CHECKING, bankAccountTypes.SAVINGS],
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
  initialBalance: {
    type: Number,
    default: 0,
  },
  startDate: Date,
  transactions: [TransactionSchema],
});

// Card Schema
const CardSchema = new mongoose.Schema({
  type: {
    type: String,
    enums: [cardTypes.CREDIT],
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
  cardLimit: {
    type: Number,
  },
  startDate: Date,
  transactions: [TransactionSchema],
});

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  accounts: [BankAccountSchema],
  cards: [CardSchema],
});

// Collection part
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
