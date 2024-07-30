const express = require("express");
const { addToCart, removeFromCart } = require("../controllers/cartController");

const authenticateToken = require("../middlewares/auth");
const authorizeUser = require("../middlewares/userAuth");

const cartRouter = express.Router();

cartRouter.post("/add", authenticateToken, authorizeUser, addToCart);
cartRouter.post("/remove", authenticateToken, authorizeUser, removeFromCart);

module.exports = cartRouter;
