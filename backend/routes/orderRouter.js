const express = require("express")
const {getKey,checkOut,verifyPayment, saveOrder} = require('../controllers/orderController');


const orderRouter = express.Router();

orderRouter.get('/getkey',getKey)

orderRouter.post('/checkout',checkOut)

orderRouter.post('/paymentverification',verifyPayment)

orderRouter.post('/createorder',saveOrder)

module.exports = orderRouter;