const express = require("express")
const router = express.Router()
const AuthController = require("../controllers/authController")
const isAuth = require("../middleware/isAuth")

// Route for user registration
router.post("/register", AuthController.register)

// Route for user login
router.post("/login", AuthController.login)

// Route for user logout
router.get("/logout", AuthController.logout)

router.get("/protected", AuthController.getProtected)

router.post("/protected", AuthController.postProtected)

module.exports = router
