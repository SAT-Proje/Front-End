const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Route for user registration
router.post('/register', AuthController.register);

// Route for user login
router.post('/login', AuthController.login);

// Route for user logout
router.get('/logout', AuthController.logout);


module.exports = router;
