const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
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
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const addressSchema = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true,
        // match: /^\d{6}$/ // Validates 6-digit pincode
    }
});

const orderSchema = new mongoose.Schema({
    items: [orderItemSchema],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type: addressSchema,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
        default: 'placed'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
