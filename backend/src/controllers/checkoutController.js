const CartModel = require('../models/Cart');
const ReceiptModel = require('../models/Receipt');
const { validateEmail } = require('../utils/helpers');

// POST checkout
exports.checkout = (req, res, next) => {
    try {
        const { userid } = req.headers; // Changed to lowercase
        const { name, email, cartItems } = req.body;

        // Validation
        if (!userid) {
            return res.status(400).json({
                success: false,
                error: 'userId header is required',
            });
        }

        if (!name || !email || !cartItems) {
            return res.status(400).json({
                success: false,
                error: 'name, email, and cartItems are required',
            });
        }

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'cartItems must be a non-empty array',
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format',
            });
        }

        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
        const tax = parseFloat((subtotal * 0.08).toFixed(2));
        const total = parseFloat((subtotal + tax).toFixed(2));

        // Create receipt
        const receipt = ReceiptModel.create({
            name,
            email,
            items: cartItems,
            subtotal: parseFloat(subtotal.toFixed(2)),
            tax,
            total,
            timestamp: new Date().toISOString(),
            status: 'completed',
        });

        // Clear cart after successful checkout
        CartModel.clearCart(userid);

        res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            data: receipt,
        });
    } catch (error) {
        next(error);
    }
};

// GET receipt by ID
exports.getReceipt = (req, res, next) => {
    try {
        const { receiptId } = req.params;

        if (!receiptId) {
            return res.status(400).json({
                success: false,
                error: 'receiptId is required',
            });
        }

        const receipt = ReceiptModel.getById(receiptId);

        if (!receipt) {
            return res.status(404).json({
                success: false,
                error: `Receipt ${receiptId} not found`,
            });
        }

        res.status(200).json({
            success: true,
            data: receipt,
        });
    } catch (error) {
        next(error);
    }
};

// GET all receipts by email
exports.getReceiptsByEmail = (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'email query parameter is required',
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format',
            });
        }

        const receipts = ReceiptModel.getByEmail(email);

        res.status(200).json({
            success: true,
            count: receipts.length,
            data: receipts,
        });
    } catch (error) {
        next(error);
    }
};