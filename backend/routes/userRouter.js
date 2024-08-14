const express = require("express");

const authenticateToken = require("../middlewares/auth");
const authorizeOwner = require("../middlewares/ownerAuth");
const authorizeUser = require("../middlewares/userAuth");
const {
  getUser,
  getAllUsers,
  removeUser,
  updateUser,
  editUser
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/:userId", getUser);

userRouter.get("/", authenticateToken, authorizeOwner, getAllUsers);

userRouter.put("/update", authenticateToken, authorizeOwner, updateUser);

userRouter.put('/edit',authenticateToken,authorizeUser,editUser)

userRouter.delete("/:userId", authenticateToken, authorizeOwner, removeUser);

module.exports = userRouter;