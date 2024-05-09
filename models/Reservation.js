const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  day: { type: String, required: true },
  time_slot_id: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "rejected", "past"],
    default: "pending"
  }
})

const Reservation = mongoose.model("Reservation", reservationSchema)

module.exports = Reservation
