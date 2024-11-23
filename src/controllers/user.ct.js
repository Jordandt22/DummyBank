const User = require("../models/db");

module.exports = {
  // User Actions
  createUser: async (req, res) => {
    const { email, password } = req.body;

    const newUser = await User.create({
      email,
      password,
    });

    res.status(200).json({ user: newUser });
  },
  authUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User Not Found." });

      const { email: userEmail, password: userPassword } = user;
      if (email === userEmail && password === userPassword) {
        return res.status(200).json({ user });
      }

      res.status(401).json({ message: "Invalid Credentials." });
    } catch (err) {
      res.status(500).json({
        serverMessage: err,
        message: "A problem occured on the server.",
      });
    }
  },
  getUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User Not Found." });

      return res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({
        serverMessage: err,
        message: "A problem occured on the server.",
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      await User.findOneAndDelete({ _id: id });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ serverMessage: err, error: "Internal server error" });
    }
  },
};
