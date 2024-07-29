const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['trolley bags', 'backpacks', 'women purse', 'laptop bags', 'travel bags', "wallet"], 
        required: true,
    },
    discount: {
        type: Number,
        default: null,
    },
    isSoldOut:{
        type:Boolean,
        require:true,
    }
});

module.exports = mongoose.model("Product", productSchema);