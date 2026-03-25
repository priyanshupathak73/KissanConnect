const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Simple unhashed password for college project per requirements
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Simple Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
