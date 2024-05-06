const User = require("../models/User")
const bcrypt = require("bcryptjs")
require("dotenv").config()
// Controller function for user registration
const register = async (req, res, next) => {
  try {
    // Extract registration data from request body
    const { username, email, password } = req.body // name changed to username, because request body field name is username
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    // Create a new user
    console.log(req.body)
    const newUser = new User({
      user_id: "1",
      name: username,
      email: email,
      password: hashedPassword,
      reservations: []
    })
    console.log(newUser)
    // Save the user to the database
    await newUser.save()

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    next(error)
  }
}

// Controller function for user login
const login = async (req, res, next) => {
  try {
    // Extract login credentials from request body
    const { email, password } = req.body

    // Find the user with the provided email
    const user = await User.findOne({ email })

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // If passwords don't match, return error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    return res.status(200).json({ message: "Successfully logged in!" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login
}
