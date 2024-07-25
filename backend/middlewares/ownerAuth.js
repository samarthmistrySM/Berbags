const userModel = require('../models/userModel');

const authorizeOwner = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(400).send("User not found!");
    }

    if (!user.isAdmin) {
      return res.status(400).send("Access Denied! You are not Admin");
    }

    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = authorizeOwner;
