const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Product = require('../models/Product');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const uploadsDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
            return;
        }
        cb(new Error('Only image files are allowed'));
    }
});

const withFullImageUrl = (productDoc) => {
    const product = productDoc.toObject ? productDoc.toObject() : productDoc;
    if (!product?.image) return product;
    if (/^https?:\/\//i.test(product.image)) return product;

    const fileName = String(product.image).split('/').pop();
    return {
        ...product,
        image: `${BASE_URL}/uploads/${fileName}`
    };
};

// Get all products - Protected route
router.get('/', verifyToken, async (req, res) => {
    try {
        const { farmerId, category, search } = req.query;
        const filters = {};

        if (farmerId) filters.farmerId = farmerId;
        if (category) filters.category = category;
        if (search) {
            filters.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(filters).populate('farmerId', 'name');
        res.status(200).json(products.map(withFullImageUrl));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get product by ID - Protected route
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('farmerId', 'name phone');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(withFullImageUrl(product));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a product
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    try {
        if (req.user.role !== 'farmer') {
            return res.status(403).json({ message: 'Only farmers can add products' });
        }

        const { name, description, price, category, stock } = req.body;
        const image = req.file ? `${BASE_URL}/uploads/${req.file.filename}` : undefined;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const newProduct = new Product({
            name,
            description,
            price: Number(price),
            farmerId: req.user.id,
            category,
            image,
            stock: stock !== undefined ? Number(stock) : 0
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: withFullImageUrl(newProduct) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'farmer') {
            return res.status(403).json({ message: 'Only farmers can update products' });
        }

        const { name, description, price, category, image, stock } = req.body;
        const normalizedImage = image
            ? (/^https?:\/\//i.test(image) ? image : `${BASE_URL}/uploads/${String(image).split('/').pop()}`)
            : image;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, image: normalizedImage, stock },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated', product: withFullImageUrl(updatedProduct) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a product
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'farmer') {
            return res.status(403).json({ message: 'Only farmers can delete products' });
        }

        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
