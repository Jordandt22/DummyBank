const userRouter = require("express-promise-router")();
const { createUser, getUser, deleteUser } = require("../controllers/user.ct");
const { authUser } = require("../middleware/user.mw");
const { userCredValidator } = require("../middleware/validator.mw");

userRouter.post("/", userCredValidator(false), createUser);

userRouter.post("/auth", userCredValidator(false), getUser);

userRouter.post("/:id", userCredValidator(true), getUser);

userRouter.delete("/:id", userCredValidator(true), authUser, deleteUser);

module.exports = userRouter;
