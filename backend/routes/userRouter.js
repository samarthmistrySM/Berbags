const express = require("express");

const authenticateToken = require("../middlewares/auth");
const authorizeOwner = require("../middlewares/ownerAuth");
const {
  getUser,
  getAllUsers,
  removeUser,
  updateUser,
} = require("../controllers/userController");

const userRouter = express.Router();

// userRouter.get('/');
userRouter.get("/:userId", getUser);
userRouter.get("/", authenticateToken, authorizeOwner, getAllUsers);
userRouter.delete("/:userId", authenticateToken, authorizeOwner, removeUser);
userRouter.put("/update", authenticateToken, authorizeOwner, updateUser);

module.exports = userRouter;