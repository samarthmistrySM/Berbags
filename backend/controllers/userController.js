const mongoose = require('mongoose');
const userModel = require('../models/userModel');

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send({ error: 'User not found!' });
        }

        res.send(user);
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).send({ error: "Server error" });
    }
};

const getAllUsers = async(req,res)=>{
    try {
        const users = await userModel.find();

        if(!users){
            res.status(400).send("Error getting users");
        }

        res.send(users);
    } catch (error) {
        console.error("Error finding users:", error);
        res.status(500).send({ error: "Server error" });
    }
}

module.exports = {getUser, getAllUsers};
