const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/kissanconnect');
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};

module.exports = connectDB;
