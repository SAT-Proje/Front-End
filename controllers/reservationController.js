// reservationController.js

const Reservation = require("../models/Reservation") // Assuming Reservation model is defined
const Restaurant = require("../models/Restaurant")
// Controller function for making a reservation
const makeReservation = async (req, res, next) => {
  try {
    // Extract the user ID and selected time slot from the request body
    const { userId } = req.user // Assuming user ID is available in req.user after authentication
    const { timeSlot, restaurantId } = req.body
    // Check if the selected time slot is available (not already reserved)
    const restaurant = await Restaurant.findById(restaurantId)
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }
    const existingReservation = await Reservation.findOne({ timeSlot })

    if (existingReservation) {
      return res.status(400).json({ message: "Time slot is already reserved" })
    }

    // Create a new reservation document
    const newReservation = new Reservation({
      restaurantId,
      userId,
      timeSlot,
      status: "pending"
      // You can include other fields like restaurantId, status, etc.
    })
    // Save the new reservation to the database
    await newReservation.save()

    // Send a success response
    res.status(200).json({
      message: "Reservation made successfully",
      reservation: newReservation
    })
  } catch (error) {
    // Handle errors
    next(error)
  }
}

const cancelReservation = async (req, res, next) => {
  try {
    // Extract the reservation ID from the request parameters
    const { reservationId } = req.body
    // Find the reservation document by ID
    const reservation = await Reservation.findById(reservationId)
    // Check if the reservation exists
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" })
    }
    // Update the status of the reservation to "cancelled"
    reservation.status = "cancelled"
    // Save the updated reservation
    await reservation.save()
    // Send a success response
    res.status(200).json({ message: "Reservation cancelled successfully" })
  } catch (error) {
    // Handle errors
    next(error)
  }
}
module.exports = {
  makeReservation,
  cancelReservation
}
