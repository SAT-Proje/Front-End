// reservationRoutes.js

const express = require("express")
const router = express.Router()
const reservationController = require("../controllers/reservationController")

// Route for making a reservation

router.post("/reservations", reservationController.makeReservation)

router.delete("/reservations", reservationController.cancelReservation)

module.exports = router
