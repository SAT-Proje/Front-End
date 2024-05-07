// reservationController.js

const Reservation = require("../models/Reservation") // Assuming Reservation model is defined

// Controller function for making a reservation
const makeReservation = async (req, res, next) => {
  try {
    // Extract the user ID and selected time slot from the request body
    const { userId } = req.user // Assuming user ID is available in req.user after authentication
    const { timeSlot } = req.body

    // Check if the selected time slot is available (not already reserved)
    const existingReservation = await Reservation.findOne({ timeSlot })

    if (existingReservation) {
      return res.status(400).json({ message: "Time slot is already reserved" })
    }

    // Create a new reservation document
    const newReservation = new Reservation({
      userId,
      timeSlot
      // You can include other fields like restaurantId, status, etc.
    })

    // Save the new reservation to the database
    await newReservation.save()

    // Send a success response
    res
      .status(200)
      .json({
        message: "Reservation made successfully",
        reservation: newReservation
      })
  } catch (error) {
    // Handle errors
    next(error)
  }
}

module.exports = {
  makeReservation
}
