const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('farmerId', 'name');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, farmerId } = req.body;
        const newProduct = new Product({ name, description, price, farmerId });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
