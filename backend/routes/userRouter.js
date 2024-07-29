const express = require('express');

const authenticateToken = require('../middlewares/auth')
const authorizeOwner = require('../middlewares/ownerAuth')
const {getUser,getAllUsers} = require('../controllers/userController')

const userRouter = express.Router();

// userRouter.get('/');
userRouter.get('/:userId',getUser);
userRouter.get('/',authenticateToken,authorizeOwner,getAllUsers);

module.exports = userRouter;