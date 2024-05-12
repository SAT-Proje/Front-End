const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  day: { type: String, required: true },
  time_slot_id: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "rejected", "approved"],
    default: "pending",
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  already_rated: {
    type: String,
    enum: ["true", "false"],
    default: "false",
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
