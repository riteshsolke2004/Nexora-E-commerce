const express = require('express');
const router = express.Router();

// GET all products
router.get('/', async(req, res) => {
    try {
        // TODO: Fetch from MongoDB
        // const products = await Product.find();
        res.json({
            success: true,
            data: [],
            message: 'Products retrieved successfully',
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET product by ID
router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        // TODO: Fetch from MongoDB
        // const product = await Product.findById(id);
        res.json({
            success: true,
            data: { id },
            message: 'Product retrieved successfully',
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;