// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurant_reservation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up routes
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
