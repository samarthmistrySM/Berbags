const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      res.status(400).send("User not found!");
    }

    const product = await productModel.findById(productId);

    if (!product) {
      res.status(400).send("User not found!");
    }

    const itemExist = user.cart.find((item) => item.product === productId);

    if (itemExist) {
      itemExist.quantity += quantity;
    } else {
      user.cart.push({ product: product._id, quantity });
    }
    await user.save();
    res.status(200).send("Product added to cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = { addToCart };
