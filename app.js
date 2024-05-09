// Import required modules
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
require("dotenv").config()
// Create Express app
const app = express()
// const connectionString =
//   "mongodb+srv://irfansenell:ozan31cekenzi@cluster0.yvpet5s.mongodb.net/"

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB")
})
mongoose.connection.on("error", err => {
  console.error("Error connecting to MongoDB:", err)
})

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  )
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})
// Set up routes
const authRoutes = require("./routes/authRoutes")
const reservationRoutes = require("./routes/reservationRoutes")
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")

app.use("/", authRoutes) // changed from /auth to /
app.use("/", reservationRoutes)
app.use("/users", userRoutes)

//app.use('/admin', adminRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "public")))

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong!")
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
