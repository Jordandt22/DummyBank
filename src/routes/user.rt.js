const userRouter = require("express-promise-router")();
const { createUser, getUser, deleteUser } = require("../controllers/user.ct");
const { authUser } = require("../middleware/user.mw");
const {
  userCredValidator,
  IDParamValidator,
} = require("../middleware/validator.mw");

userRouter.post("/", userCredValidator(false), createUser);

userRouter.post("/auth", userCredValidator(false), authUser);

userRouter.get("/:id", IDParamValidator, getUser);

userRouter.delete("/:id", userCredValidator(true), authUser, deleteUser);

module.exports = userRouter;
