const userModel = require('../models/userModel');

const authorizeUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(400).send("User not found!");
    }

    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = authorizeUser;
