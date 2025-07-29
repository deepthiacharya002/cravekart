const express = require('express');
const cors = require('cors');

const restaurants = require('./data/restaurants.json');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
    message: 'List of restaurants will be here',
    data: restaurants,
  });
});

app.post('/order', (req, res) => {
  const order = req.body;
  console.log('Order received:', order);
  // Here you would typically save the order to a database
  res.status(201).json({
    message: 'Order created successfully',
    order: order
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
