const { object, string, number, date } = require("yup");

// ---- User Schemas ----

const userCredSchema = object({
  email: string()
    .min(1, "An email is required.")
    .max(500, "Email exceeds the character limit (500).")
    .email("Invalid email.")
    .required("A valid email is required."),
  password: string()
    .min(8, "Password must be atleast 8 characters long.")
    .max(500, "Password exceeds the character limit (500).")
    .required("A password is required."),
});

const IDCredSchema = object({
  id: string()
    .min(1, "A user ID is required.")
    .max(1000, "ID exceeds max character limit (1000).")
    .required("A user ID is required."),
});

// ---- Bank Schemas ----

const bankAccountSchema = object({
  initialBalance: number()
    .min(0, "Min balance is 0.")
    .max(1000 * 1000 * 1000 * 1000, "Exceeds the max balance.")
    .required("A balance is required."),
  type: string()
    .min(1, "A bank account type is required.")
    .required("A bank account type is required."),
  startDate: date(),
});

const transactionSchema = object({
  name: string()
    .min(3, "Name must be atleast 3 characters.")
    .max(250, "Name exceeds character limit (250).")
    .required("A name is required."),
  amount: number()
    .min(-1000 * 1000 * 1000 * 1000, "The amount is invalid.")
    .max(1000 * 1000 * 1000 * 1000, "The amount is invalid.")
    .required("An amount is required."),
  category: string()
    .min(1, "A category is required.")
    .max(25, "Category exceeds the character limit (25).")
    .required("A category is required."),
  startDate: date(),
});

const cardSchema = object({
  currentBalance: number()
    .min(0, "Min balance is 0.")
    .max(1000 * 1000 * 1000 * 1000, "Exceeds the max balance.")
    .required("A balance is required."),
  cardLimit: number()
    .min(1, "Min card limit is 1.")
    .max(1000 * 1000 * 1000 * 1000, "Exceeds the max card limit.")
    .required("A card limit is required."),
  type: string()
    .min(1, "A card type is required.")
    .required("A card type is required."),
});

module.exports = {
  userCredValidator: (includeID) => async (req, res, next) => {
    const { id } = req.params;
    const { email, password } = req.body;

    try {
      await userCredSchema.validate({
        email,
        password,
      });

      if (includeID) {
        await IDCredSchema.validate({
          id,
        });
      }

      next();
    } catch (err) {
      const { errors } = err;
      res.status(422).json({ message: "Invalid data.", formErrors: errors });
    }
  },
  bankAccountValidator: async (req, res, next) => {
    const { newAccount } = req.body;

    try {
      await bankAccountSchema.validate(newAccount);

      next();
    } catch (err) {
      const { errors } = err;
      res.status(422).json({ message: "Invalid data.", formErrors: errors });
    }
  },
  transactionValidator: async (req, res, next) => {
    const { newTransaction } = req.body;

    try {
      await transactionSchema.validate(newTransaction);

      next();
    } catch (err) {
      const { errors } = err;
      res.status(422).json({ message: "Invalid data.", formErrors: errors });
    }
  },
  cardValidator: async (req, res, next) => {
    const { newCard } = req.body;

    try {
      await cardSchema.validate(newCard);

      next();
    } catch (err) {
      const { errors } = err;
      res.status(422).json({ message: "Invalid data.", formErrors: errors });
    }
  },
};
