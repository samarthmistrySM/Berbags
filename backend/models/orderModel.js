const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        }
    }],
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    isDelivered: {
        type:Boolean,
        default:false,
    }
});

module.exports = mongoose.model("Order", orderSchema);
