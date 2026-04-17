const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, phone, address } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const trimmedEmail = String(email).trim().toLowerCase();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
        if (!isValidEmail) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        if (String(password).length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const normalizedRole = role === 'farmer' ? 'farmer' : 'user';

        const existingUser = await User.findOne({ email: trimmedEmail });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email: trimmedEmail,
            password: hashedPassword,
            role: normalizedRole,
            phone,
            address
        });
        await newUser.save();

        const tokenPayload = {
            id: newUser._id,
            role: newUser.role,
            email: newUser.email
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'kissanconnect-dev-secret', {
            expiresIn: '7d'
        });

        const safeUser = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            phone: newUser.phone,
            address: newUser.address
        };
        
        res.status(201).json({
            message: 'User registered successfully',
            token,
            role: safeUser.role,
            user: safeUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Simple Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const tokenPayload = {
            id: user._id,
            role: user.role,
            email: user.email
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'kissanconnect-dev-secret', {
            expiresIn: '7d'
        });

        const safeUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address
        };
        
        res.status(200).json({
            message: 'Login successful',
            token,
            role: safeUser.role,
            user: safeUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.role !== 'farmer') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.role !== 'farmer') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const { name, phone, address, addressLine1, addressLine2, city, state, pincode } = req.body;
        
        // Validate phone if provided
        if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
            return res.status(400).json({ message: 'Mobile number must be exactly 10 digits' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, phone, address, addressLine1, addressLine2, city, state, pincode },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update profile endpoint
router.post('/profile/update', verifyToken, async (req, res) => {
    try {
        const { name, phone, addressLine1, addressLine2, city, state, pincode } = req.body;
        const userId = req.user.id;

        // Validation
        if (!name || !addressLine1 || !city || !pincode) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        if (!phone || !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
            return res.status(400).json({ message: 'Mobile number must be exactly 10 digits' });
        }

        if (!/^\d{6}$/.test(pincode.replace(/\D/g, ''))) {
            return res.status(400).json({ message: 'Pincode must be exactly 6 digits' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, phone, addressLine1, addressLine2, city, state, pincode },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ 
            message: 'Profile updated successfully', 
            user: updatedUser 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
