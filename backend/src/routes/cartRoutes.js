const express = require('express');
const router = express.Router();

// GET cart
router.get('/', (req, res) => {
    try {
        const userId = req.get('userId');
        res.json({
            success: true,
            data: {
                userId,
                items: [],
                subtotal: 0,
                tax: 0,
                total: 0,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST - Add to cart
router.post('/', (req, res) => {
    try {
        const { productId, qty } = req.body;
        res.json({ success: true, message: 'Item added to cart', data: { productId, qty } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT - Update cart quantity
router.put('/:cartId', (req, res) => {
    try {
        const { qty } = req.body;
        res.json({ success: true, message: 'Cart updated', data: { qty } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// DELETE - Remove from cart
router.delete('/:cartId', (req, res) => {
    try {
        res.json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;