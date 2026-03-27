const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create an order
router.post('/', async (req, res) => {
    try {
        const { productId, buyerName, buyerPhone } = req.body;
        const newOrder = new Order({ productId, buyerName, buyerPhone });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
