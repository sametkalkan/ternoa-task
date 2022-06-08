const express = require('express');
const UserController = require('./userController');
const NftMiddleware = require('./userMiddleware');
const auth = require('../../utils/auth');

const router = express.Router();

// login user
router.post('/login', UserController.login);
router.get('/info', auth.authenticateUser, UserController.getUserInfo);


module.exports = router;
