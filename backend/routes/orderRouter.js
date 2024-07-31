const express = require("express")
const {getKey,checkOut,verifyPayment, saveOrder, getUserOrders} = require('../controllers/orderController');

const authenticateToken = require('../middlewares/auth')
const authorizeOwner = require('../middlewares/ownerAuth')
const authorizeUser = require('../middlewares/userAuth')

const orderRouter = express.Router();

orderRouter.get('/',authenticateToken,authorizeOwner)

orderRouter.get('/getorder/:userId', getUserOrders)

orderRouter.get('/getkey',getKey)

orderRouter.post('/checkout',checkOut)

orderRouter.post('/paymentverification',verifyPayment)

orderRouter.post('/createorder',saveOrder)

module.exports = orderRouter;