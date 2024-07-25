const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        require:true,
    },
    discount:{
        type:Number,
        default:null,
    },
})

module.exports = mongoose.model("Product",productSchema)