const User = require("../models/db");

module.exports = {
  authUser: async (req, res, next) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User Not Found." });

      const { email: userEmail, password: userPassword } = user;
      if (email === userEmail && password === userPassword) {
        req.user = user;
        return next();
      }

      res.status(401).json({ message: "Invalid Credentials." });
    } catch (err) {
      res.status(500).json({
        serverMessage: err.message,
        message: "A problem occured on the server.",
      });
    }
  },
};
