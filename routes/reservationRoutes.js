// reservationRoutes.js

const express = require("express")
const router = express.Router()
const reservationController = require("../controllers/reservationController")

// Route for making a reservation
router.post("/make", reservationController.makeReservation)

module.exports = router
