const userRouter = require("express-promise-router")();
const {
  createUser,
  getUser,
  deleteUser,
  authAndGetUser,
} = require("../controllers/user.ct");
const { authUser } = require("../middleware/user.mw");
const {
  userCredValidator,
  IDParamValidator,
} = require("../middleware/validator.mw");

// POST: Create a new User
userRouter.post("/", userCredValidator(false), createUser);

// POST: Get a user with email and password
userRouter.post("/auth", userCredValidator(false), authAndGetUser);

// GET: Get a user with user ID
userRouter.get("/:id", IDParamValidator, getUser);

// DELETE: Delete a user
userRouter.delete("/:id", userCredValidator(true), authUser, deleteUser);

module.exports = userRouter;
