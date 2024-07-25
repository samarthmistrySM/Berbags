const express = require("express");

const {
  registerUser,
  logInUser,
  logoutUser,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", logInUser);
authRouter.post("/logout", logoutUser);

module.exports = authRouter;
