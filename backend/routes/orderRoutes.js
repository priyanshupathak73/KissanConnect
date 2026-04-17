const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all orders
router.get('/', verifyToken, async (req, res) => {
    try {
        const { userId, farmerId } = req.query;
        
        // Users can only see their own orders
        const effectiveUserId = userId || req.user.id;
        if (!userId && req.user.role === 'user') {
            // Regular users can only see their own orders
        } else if (userId && userId !== req.user.id && req.user.role !== 'farmer') {
            // Only allow if it's their own ID or they're a farmer
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const query = {};
        if (effectiveUserId) query.userId = effectiveUserId;

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .populate('userId', 'name email')
            .populate('items.productId', 'name price');

        if (farmerId) {
            const farmerOrders = orders
                .map((order) => {
                    const farmerItems = order.items.filter(
                        (item) => item.farmerId && item.farmerId.toString() === farmerId
                    );
                    if (!farmerItems.length) return null;

                    const earningFromOrder = farmerItems.reduce(
                        (sum, item) => sum + item.unitPrice * item.quantity,
                        0
                    );

                    return {
                        ...order.toObject(),
                        items: farmerItems,
                        farmerEarning: earningFromOrder
                    };
                })
                .filter(Boolean);

            return res.status(200).json(farmerOrders);
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create an order
router.post('/', verifyToken, async (req, res) => {
    try {
        const { buyerName, buyerPhone, deliveryAddress, items } = req.body;
        const userId = req.user.id;

        if (!buyerName || !buyerPhone || !items || !items.length) {
            return res.status(400).json({ message: 'Missing required order fields' });
        }

        const productIds = items.map((item) => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });
        const productMap = products.reduce((map, product) => {
            map[product._id.toString()] = product;
            return map;
        }, {});

        const normalizedItems = items.map((item) => {
            const product = productMap[item.productId];
            if (!product) {
                throw new Error('One or more products do not exist');
            }

            return {
                productId: product._id,
                productName: product.name,
                productImage: product.image,
                quantity: item.quantity,
                unitPrice: product.price,
                farmerId: product.farmerId
            };
        });

        const totalAmount = normalizedItems.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
        );

        const newOrder = new Order({
            userId,
            items: normalizedItems,
            buyerName,
            buyerPhone,
            deliveryAddress,
            totalAmount
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status - Protected route (farmers only)
router.patch('/:id/status', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        
        if (req.user.role !== 'farmer') {
            return res.status(403).json({ message: 'Only farmers can update order status' });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Verify farmer owns items in this order
        const farmerItems = order.items.filter(item => item.farmerId.toString() === req.user.id);
        if (!farmerItems.length) {
            return res.status(403).json({ message: 'Unauthorized to update this order' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Order status updated', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get farmer earnings - Protected route (farmers only)
router.get('/farmer/:farmerId/earnings', verifyToken, async (req, res) => {
    try {
        const { farmerId } = req.params;
        
        // Only farmers can view their own earnings, admins can view any
        if (req.user.role !== 'farmer' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Farmers can only view their own earnings
        if (req.user.role === 'farmer' && req.user.id !== farmerId) {
            return res.status(403).json({ message: 'Can only view your own earnings' });
        }

        const orders = await Order.find({ 'items.farmerId': farmerId });

        const totalEarnings = orders.reduce((sum, order) => {
            const lineTotal = order.items.reduce((itemSum, item) => {
                if (item.farmerId.toString() !== farmerId) return itemSum;
                return itemSum + item.unitPrice * item.quantity;
            }, 0);
            return sum + lineTotal;
        }, 0);

        res.status(200).json({
            totalEarnings,
            orderCount: orders.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
