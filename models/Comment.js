const mongooseSchema = require("mongoose").Schema
const Restaurant = require("./Restaurant")
const User = require("./User")
const CommentSchema = new mongooseSchema({
  content: {
    type: String,
    required: true
  },
  rating: {
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
  user: {
    type: mongooseSchema.Types.ObjectId,
    ref: "User",
    required: true
  },
  restaurant: {
    type: mongooseSchema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  }
})

module.exports = require("mongoose").model("Comment", CommentSchema)
