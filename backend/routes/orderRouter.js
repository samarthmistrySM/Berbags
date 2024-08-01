const express = require("express");
const {
  getKey,
  checkOut,
  verifyPayment,
  saveOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const authenticateToken = require("../middlewares/auth");
const authorizeOwner = require("../middlewares/ownerAuth");
const authorizeUser = require("../middlewares/userAuth");

const orderRouter = express.Router();

orderRouter.get("/", authenticateToken, authorizeOwner, getAllOrders);

orderRouter.get("/getorder/:userId", authenticateToken, authorizeUser, getUserOrders);

orderRouter.get("/getkey", authenticateToken, authorizeUser, getKey);

orderRouter.post("/checkout", authenticateToken, authorizeUser, checkOut);

orderRouter.post("/paymentverification", verifyPayment);

orderRouter.post("/createorder", authenticateToken, authorizeUser, saveOrder);

orderRouter.put('/update', authenticateToken, authorizeOwner, updateOrderStatus)

module.exports = orderRouter;
