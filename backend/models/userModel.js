const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  contact: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: "../public/images/profilePlaceholder.jpg",
  },
  orders: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Order",
    }
  ],
  isAdmin:{
    type:Boolean,
    default:false,
  },
});

module.exports = mongoose.model("User", userSchema);
