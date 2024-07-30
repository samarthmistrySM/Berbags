const productModel = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products) {
      return res
        .status(400)
        .send("Products not available now! Try Again Later..");
    }
    res.send(products);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).send("Server error");
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await productModel.findById(productId);

    if(!product) {
      res.status(400).send("Product not found!")
    }
    res.send(product);
  } catch (error) {
    console.error("Error geting product:", error);
    res.status(500).send("Server error");
  }
}

const addProduct = async (req, res) => {
  const { name, image, price, category, discount, isSoldOut } = req.body;
  try {
    const productExist = await productModel.findOne({ name });

    if (productExist) {
      return res
        .status(400)
        .send("Product already exists, please use a different name");
    }

    let finalDiscount = discount;
    if (!finalDiscount) {
      finalDiscount = null;
    }

    const product = await productModel.create({
      name,
      image,
      price,
      category,
      discount: finalDiscount,
      isSoldOut,
    });

    await product.save();

    res.status(201).send("Product Added successfully");
  } catch (error) {
    console.error("Error Adding product:", error);
    res.status(500).send("Server error");
  }
};

const updateProduct = async (req, res) => {
  const { name, productId, price, discount, isSoldOut } = req.body;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      res.status(400).send("Product not available");
    }

    let finalDiscount = discount;
    if (!finalDiscount) {
      finalDiscount = null;
    }

    await product.updateOne({
      name,
      price,
      discount: finalDiscount,
      isSoldOut,
    });

    await product.save();
    res.status(201).send("Product Updated successfully!");
  } catch (error) {
    console.error("Error Updating product:", error);
    res.status(500).send("Server error");
  }
};

module.exports = { getAllProducts, addProduct, updateProduct, getProduct };
