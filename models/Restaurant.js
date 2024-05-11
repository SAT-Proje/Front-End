const mongoose = require("mongoose")
const Reservation = require("./Reservation")
const restaurantSchema = new mongoose.Schema({
  id: { type: String, required: false },
  about: {
    name: { type: String, required: false },
    address_city: { type: String, required: false },
    address_full: { type: String, required: false },
    google_maps_embed: { type: String, required: false },
    cuisine: { type: String, required: false },
    newly_added: { type: Boolean, default: false },
    short_info: { type: String, required: true }
  },
  img: {
    restaurant_big: { type: String, required: false },
    restaurant_small: { type: String, required: false },
    menu: { type: String, required: false },
    flag: { type: String, required: false }
  },
  rating: {
    overall: {
      value: { type: String, required: false },
      weight: { type: String, required: false }
    },
    services: {
      amenities: {
        value: { type: String, required: false },
        weight: { type: String, required: false }
      },
      location: {
        value: { type: String, required: false },
        weight: { type: String, required: false }
      },
      hygiene: {
        value: { type: String, required: false },
        weight: { type: String, required: false }
      },
      communication: {
        value: { type: String, required: false },
        weight: { type: String, required: false }
      },
      pricing: {
        value: { type: String, required: false },
        weight: { type: String, required: false }
      }
    }
  },
  reviews: [
    {
      id: { type: String, required: false },
      name: { type: String, required: false },
      rating: { type: String, required: false },
      comment: { type: String, required: false }
    }
  ],
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation"
    }
  ]
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant
