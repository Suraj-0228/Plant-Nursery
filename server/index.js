const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const plantRoutes = require('./routes/plants');
const wishlistRoutes = require('./routes/wishlist');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// A simple middleware to simulate req.user for protected routes
// In a real app, this would be a proper JWT authentication middleware
app.use((req, res, next) => {
  // To test, you can manually set a user ID here
  // req.user = { id: 'some_user_id_from_your_db' }; 
  next();
});

// Database Connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/plant-nursery';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Plant Nursery Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
