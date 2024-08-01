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
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  contact: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: "https://res.cloudinary.com/pinorama/image/upload/v1722443917/pppb5m0txhiodzntjfiz.jpg",
  },
  orders: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Order"
    }
  ],
  isAdmin:{
    type:Boolean,
    default:false,
  },
});

module.exports = mongoose.model("User", userSchema);
