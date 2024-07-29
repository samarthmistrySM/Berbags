const express = require('express');
const {getUser} = require('../controllers/userController')

const userRouter = express.Router();

// userRouter.get('/');
userRouter.get('/:userId',getUser);

module.exports = userRouter;