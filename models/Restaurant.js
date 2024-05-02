const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  day: { type: String, required: true },
  slots: [{
    id: { type: String, required: true },
    available: { type: Boolean, default: true }
  }]
});

const restaurantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  about: {
    name: { type: String, required: true },
    address_city: { type: String, required: true },
    address_full: { type: String, required: true },
    google_maps_embed: { type: String, required: true },
    cuisine: { type: String, required: true },
    newly_added: { type: Boolean, default: false }
  },
  img: {
    restaurant_big: { type: String, required: true },
    restaurant_small: { type: String, required: true },
    menu: { type: String, required: true }
  },
  rating: {
    overall: {
      value: { type: String, required: true },
      weight: { type: String, required: true }
    },
    services: {
      amenities: { value: { type: String, required: true }, weight: { type: String, required: true } },
      location: { value: { type: String, required: true }, weight: { type: String, required: true } },
      hygiene: { value: { type: String, required: true }, weight: { type: String, required: true } },
      communication: { value: { type: String, required: true }, weight: { type: String, required: true } },
      pricing: { value: { type: String, required: true }, weight: { type: String, required: true } }
    }
  },
  reviews: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: String, required: true },
    comment: { type: String, required: true }
  }],
  reservations: [reservationSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
