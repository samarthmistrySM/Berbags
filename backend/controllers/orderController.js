const orderModel = require("../models/orderModel");
const Razorpay = require("razorpay");
const userModel = require("../models/userModel");

require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate('user').populate('products.product');
    
    if (!orders) {
      res.status(400).send("Orders not found!");
    }

    res.send(orders.slice().reverse());
  } catch (error) {
    console.error(error);
    res.status(500).send("error getting orders");
  }
};

const getUserOrders = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId)
      .populate({
        path: 'orders',
        populate: {
          path: 'products.product',
          model: 'Product',
        },
      })

    if (!user) {
      res.status(400).send("User not found!");
    }
    res.send(user.orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

const getKey = (req, res) => {
  if (!process.env.RAZORPAY_KEY_ID) {
    return res.status(400).send("Key not found");
  }
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

const checkOut = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("error creating order");
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const generated_signature = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

const saveOrder = async (req, res) => {
  const { userId, address, cart, amount } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      res.send("User not found!");
    }
    const newOrder = await orderModel.create({
      user: user._id,
      address: address,
      products: cart,
      amount: amount,
    });
    await user.updateOne({
      cart: [],
    });
    user.orders.push(newOrder);
    await user.save();
    res.status(200).send("Order created successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

const updateOrderStatus = async (req, res) => {
  const {isDelivered, orderId} = req.body;

  try {
    const order = await orderModel.findById(orderId);

    if(!order){
      res.status(400).send('Order not found');
    }

    await order.updateOne({
      isDelivered
    })

    await order.save();
    res.status(200).send("Order updated successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getKey,
  checkOut,
  verifyPayment,
  saveOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus
};
