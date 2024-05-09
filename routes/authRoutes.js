const express = require("express")
const router = express.Router()
const AuthController = require("../controllers/authController")

// Route for user registration
router.post("/register", AuthController.register)

// Route for user login
router.post("/login", AuthController.login)

router.get("/restaurants", AuthController.getRestaurants)

router.get("restaurants/:id", AuthController.getRestaurant)

router.post("/restaurants-cuisine", AuthController.cuisineFilter)

router.post("/restaurants-name", AuthController.nameFilter)

router.post("/restaurants-location", AuthController.locationFilter)

router.post("/comments", AuthController.postComment)

//router.post("/reservation-make", AuthController.makeReservation)

module.exports = router
