// reservationController.js

const Reservation = require("../models/Reservation"); // Assuming Reservation model is defined
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
// Controller function for making a reservation

const makeReservation = async (req, res, next) => {
  try {
    // Extract the user ID and selected time slot from the request body
    const { day, timeSlot, userId, restaurantId } = req.body;
    // Check if the selected time slot is available (not already reserved)
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const existingReservation = await Reservation.findOne({
      day: day,
      timeSlot: timeSlot,
      restaurantId: restaurantId,
    });

    if (existingReservation) {
      return res.status(400).json({ message: "Time slot is already reserved" });
    }

    // Create a new reservation document
    const newReservation = new Reservation({
      day: day,
      user_id: userId,
      time_slot_id: timeSlot,
      status: "pending",
      restaurant_id: restaurantId,
      // You can include other fields like restaurantId, status, etc.
    });
    // Save the new reservation to the database
    await newReservation.save();
    const user = await User.findById(userId);
    await user.updateOne({ $push: { reservations: newReservation } });
    await user.save();
    await restaurant.updateOne({ $push: { reservations: newReservation } });
    await restaurant.save();

    return res.status(200).json({
      message: "Reservation made successfully",
      reservation: newReservation,
    });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

const updateReservationAlreadyRated = async (req, res, next) => {
  try {
    const { reservation_id } = req.body;
    const reservation = await Reservation.findById(reservation_id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    reservation.already_rated = true;
    await reservation.save();
    return res
      .status(200)
      .json({ message: "Reservation updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getRestaurantReservations = async (req, res, next) => {
  try {
    const { restaurantId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId).populate(
      "reservations"
    );
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.status(200).json({ reservations: restaurant.reservations });
  } catch (error) {
    next(error);
  }
};

const getUserReservations = async (req, res, next) => {
  try {
    const userId = req.body.user_id;
    const user = await User.findById(userId).populate("reservations");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ reservations: user.reservations });
  } catch (error) {
    next(error);
  }
};

const cancelReservation = async (req, res, next) => {
  try {
    // Extract the reservation ID from the request parameters
    const reservation_id = req.body.reservation_id;
    // Find the reservation document by ID
    const response = await Reservation.findOneAndDelete({
      _id: reservation_id,
    });
    // Check if the reservation exists
    if (!response) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    // Handle errors
    next(error);
  }
};
module.exports = {
  makeReservation,
  cancelReservation,
  getRestaurantReservations,
  getUserReservations,
  updateReservationAlreadyRated,
};
