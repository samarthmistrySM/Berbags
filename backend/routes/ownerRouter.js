const express = require("express");
const { registerOwner, logInOwner } = require("../controllers/ownerController");

const authenticateToken = require("../middlewares/auth");
const authorizeOwner = require("../middlewares/ownerAuth");

const ownerRouter = express.Router();

ownerRouter.post("/register", authenticateToken, authorizeOwner, registerOwner);
ownerRouter.post("/login", logInOwner);

module.exports = ownerRouter;
