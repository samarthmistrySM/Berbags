const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
        default:"../public/images/profilePlaceholder.jpg",
    }
})

module.exports = mongoose.model("Owner",OwnerSchema)