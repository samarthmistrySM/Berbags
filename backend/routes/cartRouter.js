const express = require("express");
const { addToCart } = require("../controllers/cartController");

const authenticateToken = require("../middlewares/auth");
const authorizeUser = require("../middlewares/userAuth");

const cartRouter = express.Router();

cartRouter.use("/add", authenticateToken, authorizeUser, addToCart);

module.exports = cartRouter;
