const express = require("express");

const {
  addProduct,
  getAllProducts,
  updateProduct
} = require("../controllers/prodcutController");

const authenticateToken = require("../middlewares/auth");
const authorizeOwner = require("../middlewares/ownerAuth");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/add", authenticateToken, authorizeOwner, addProduct);
productRouter.put("/update", authenticateToken, authorizeOwner, updateProduct);

module.exports = productRouter;
