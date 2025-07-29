const mongoose = require('mongoose');

async function runServer () {
    try {
        await mongoose.connect('mongodb://localhost:27017/CraveKart');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}    

module.exports = runServer;