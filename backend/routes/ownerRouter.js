const express = require("express");
const { registerOwner, logInOwner } = require("../controllers/ownerController");

const authenticateToken = require("../middlewares/auth");
const authorizeOwner = require("../middlewares/ownerAuth");

const ownerRouter = express.Router();

ownerRouter.post("/login", logInOwner);
ownerRouter.post("/register", authenticateToken, authorizeOwner, registerOwner);

module.exports = ownerRouter;


