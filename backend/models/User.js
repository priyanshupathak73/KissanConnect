const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['farmer', 'user'], default: 'user' },
    businessName: { type: String, trim: true },
    phone: { type: String },
    address: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
