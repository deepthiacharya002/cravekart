const express = require('express');
const cors = require('cors');

const restaurants = require('./data/restaurants.json');

const runServer = require('./dbConnect');
const orderModel = require('./models/order');
const restaurantModel = require('./models/restaurant');

// MongoDB connection

runServer()

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
  try {
    const restaurantList = await restaurantModel.find();
    res.json({
      message: 'List of restaurants',
      data: restaurantList,
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({
      error: 'Failed to fetch restaurants',
      message: error.message,
    });
  }
});

app.post('/order', (req, res) => {
  const order = req.body;
  console.log('Order received:', order);
  // Here you would typically save the order to a database
  const newOrder = new orderModel(order);
  newOrder.save()
    .then(() => {
      console.log('Order saved successfully');
      res.status(201).json({
        message: 'Order created successfully',
        order: newOrder,
      });
    })
    .catch((error) => {
      console.error('Error saving order:', error);
      return res.status(500).json({
        error: 'Failed to save order',
        message: error.message,
      });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
