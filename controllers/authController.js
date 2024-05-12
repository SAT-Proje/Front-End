const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");
require("dotenv").config();
// Controller function for user registration

const register = async (req, res, next) => {
  try {
    // Extract registration data from request body
    const { username, email, password } = req.body; // name changed to username, because request body field name is username
    // Check if user with the provided email already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      user_id: "1",
      name: username,
      email: email,
      password: hashedPassword,
      reservations: [],
    });
    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller function for user login
const login = async (req, res, next) => {
  try {
    // Extract login credentials from request body

    const { email, password } = req.body;
    // Find the user with the provided email
    const user = await User.findOne({ email });
    // If user not found, return error
    if (!user) {
      return res.status(401).json({ message: "User not found with email!" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res
      .status(200)
      .json({ message: "Successfully logged in!", user: user });
  } catch (error) {
    next(error);
  }
};
const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({ restaurants });
  } catch (error) {
    next(error);
  }
};
const cuisineFilter = async (req, res, next) => {
  try {
    const cuisine = req.body.cuisine;
    const query = await Restaurant.find({
      "about.cuisine": cuisine,
    });
    return res.status(200).json({ query });
  } catch (error) {
    next(error);
  }
};
const nameFilter = async (req, res, next) => {
  try {
    const name = req.body.name;
    const query = await Restaurant.find({
      "about.name": name,
    });
    return res.status(200).json({ query });
  } catch (error) {
    next(error);
  }
};

const newlyAddedFilter = async (req, res, next) => {
  try {
    // if restaurant.about.newly_added = true
    const query = await Restaurant.find({ "about.newly_added": true });
    return res.status(200).json({ query });
  } catch (error) {
    next(error);
  }
};

const highRatedFilter = async (req, res, next) => {
  try {
    // if restaurant.rating.overall.value > 4.4
    const query = await Restaurant.find({ "rating.overall.value": { $gt: 4.4 } });
    return res.status(200).json({ query });
  } catch (error) {
    next(error);
  }
};

const locationFilter = async (req, res, next) => {
  try {
    const location = req.body.location;
    const query = await Restaurant.find({
      "about.address_city": location,
    });
    return res.status(200).json({ query });
  } catch (error) {
    next(error);
  }
};

const postComment = async (req, res, next) => {
  try {
    const { comment, rating, user, restaurantId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    
    restaurant.rating.services.amenities.value =
      (parseFloat(rating.amenities) +
        restaurant.rating.services.amenities.value *
          restaurant.rating.services.amenities.weight) /
      (parseFloat(restaurant.rating.services.amenities.weight) + 1);
    restaurant.rating.services.amenities.weight =
      parseFloat(restaurant.rating.services.amenities.weight) + 1;
    restaurant.rating.services.location.value =
      (parseFloat(rating.location) +
        restaurant.rating.services.location.value *
          restaurant.rating.services.location.weight) /
      (parseFloat(restaurant.rating.services.location.weight) + 1);
    restaurant.rating.services.location.weight =
      parseFloat(restaurant.rating.services.location.weight) + 1;
    restaurant.rating.services.hygiene.value =
      (parseFloat(rating.hygiene) +
        restaurant.rating.services.hygiene.value *
          restaurant.rating.services.hygiene.weight) /
      (parseFloat(restaurant.rating.services.hygiene.weight) + 1);
    restaurant.rating.services.hygiene.weight =
      parseFloat(restaurant.rating.services.hygiene.weight) + 1;
    restaurant.rating.services.communication.value =
      (parseFloat(rating.communication) +
        restaurant.rating.services.communication.value *
          restaurant.rating.services.communication.weight) /
      (parseFloat(restaurant.rating.services.communication.weight) + 1);
    restaurant.rating.services.communication.weight =
      parseFloat(restaurant.rating.services.communication.weight) + 1;
    restaurant.rating.services.pricing.value =
      (parseFloat(rating.pricing) +
        restaurant.rating.services.pricing.value *
          restaurant.rating.services.pricing.weight) /
      (parseFloat(restaurant.rating.services.pricing.weight) + 1);
    restaurant.rating.services.pricing.weight =
      parseFloat(restaurant.rating.services.pricing.weight) + 1;

    restaurant.rating.overall.value =
      (parseFloat(restaurant.rating.services.amenities.value) +
        parseFloat(restaurant.rating.services.location.value) +
        parseFloat(restaurant.rating.services.hygiene.value) +
        parseFloat(restaurant.rating.services.communication.value) +
        parseFloat(restaurant.rating.services.pricing.value)) /
      5;

    const review = {
      name: user.name,
      rating:
        (parseFloat(rating.amenities) +
          parseFloat(rating.location) +
          parseFloat(rating.hygiene) +
          parseFloat(rating.communication) +
          parseFloat(rating.pricing)) /
        5,
      comment: comment,
    };

    await restaurant.updateOne({ $push: { reviews: review } });
    await restaurant.save();

    return res
      .status(201)
      .json({ message: "Comment added successfully", review: review });
  } catch (error) {
    next(error);
  }
};
const getRestaurant = async (req, res, next) => {
  try {
    const id = req.body.id;
    const restaurant = await Restaurant.findById(id);
    return res.status(200).json({ restaurant });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getRestaurants,
  cuisineFilter,
  nameFilter,
  locationFilter,
  postComment,
  getRestaurant,
  newlyAddedFilter,
  highRatedFilter,
};
