const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    }
});

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    foods: [foodSchema]
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
