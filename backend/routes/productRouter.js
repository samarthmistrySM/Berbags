const express = require("express");

const {addProduct,getAllProducts} = require('../controllers/prodcutController')

const authenticateToken = require('../middlewares/auth')
const authorizeOwner = require('../middlewares/ownerAuth')

const productRouter = express.Router();

productRouter.get('/',getAllProducts);
productRouter.post('/add',authenticateToken,authorizeOwner,addProduct);

module.exports = productRouter;