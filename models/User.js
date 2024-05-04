const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: false }, // currently disabled
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }]
})

const User = mongoose.model("User", userSchema)

module.exports = User
