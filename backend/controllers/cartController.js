const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      res.status(400).send("User not found!");
    }

    const product = await productModel.findById(productId);

    if (!product) {
      res.status(400).send("User not found!");
    }

    const itemExist = user.cart.find((item) => item.product.equals(productId));

    if (itemExist) {
      itemExist.quantity += 1;
    } else {
      user.cart.push({ product: product._id, quantity: 1 });
    }
    await user.save();
    res.status(200).send("Product added to cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = { addToCart };
