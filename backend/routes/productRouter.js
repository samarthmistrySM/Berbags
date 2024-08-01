const express = require("express");

const {
  addProduct,
  getAllProducts,
  updateProduct,
  getProduct
} = require("../controllers/prodcutController");

const authenticateToken = require("../middlewares/auth");
const authorizeUser = require("../middlewares/userAuth");
const authorizeOwner = require("../middlewares/ownerAuth");

const productRouter = express.Router();

productRouter.get("/", authenticateToken, authorizeUser, getAllProducts);
productRouter.get("/:productId",authenticateToken,authorizeUser , getProduct);
productRouter.post("/add", authenticateToken, authorizeOwner, addProduct);
productRouter.put("/update", authenticateToken, authorizeOwner, updateProduct);

module.exports = productRouter;
