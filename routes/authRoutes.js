const express = require("express")
const router = express.Router()
const AuthController = require("../controllers/authController")

// Route for user registration
router.post("/register", AuthController.register)

// Route for user login
router.post("/login", AuthController.login)

router.post("/restaurants", AuthController.getRestaurants)

module.exports = router
