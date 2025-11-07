const CartModel = require('../models/Cart');
const ProductModel = require('../models/Product');

// GET cart
exports.getCart = (req, res, next) => {
    try {
        const { userid } = req.headers;

        console.log('🔍 Headers received:', req.headers);
        console.log('🆔 userId:', userid);

        if (!userid) {
            return res.status(400).json({
                success: false,
                error: 'userId header is required',
            });
        }

        // FIX: Create cart if it doesn't exist
        let cart = CartModel.getCart(userid);

        if (!cart) {
            console.log('📦 Creating new cart for user:', userid);
            // Create new empty cart
            cart = CartModel.getOrCreateCart(userid);
        }

        const totals = calculateTotals(cart.items);

        res.status(200).json({
            success: true,
            data: {
                userId: userid,
                items: cart.items,
                subtotal: totals.subtotal,
                tax: totals.tax,
                total: totals.total,
            },
        });
    } catch (error) {
        console.error('❌ Error in getCart:', error);
        next(error);
    }
};

// Helper function to calculate totals
function calculateTotals(items) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = parseFloat((subtotal * 0.08).toFixed(2));
    const total = parseFloat((subtotal + tax).toFixed(2));

    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax,
        total,
    };
}

// POST add to cart
exports.addToCart = (req, res, next) => {
    try {
        const { userid } = req.headers;
        const { productId, qty } = req.body;

        // Validation
        if (!userid) {
            return res.status(400).json({
                success: false,
                error: 'userId header is required',
            });
        }

        if (!productId || !qty) {
            return res.status(400).json({
                success: false,
                error: 'productId and qty are required',
            });
        }

        if (typeof qty !== 'number' || qty < 1) {
            return res.status(400).json({
                success: false,
                error: 'qty must be a positive number',
            });
        }

        // Check if product exists
        const ProductModel = require('../models/Product');
        const product = ProductModel.getById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: `Product ${productId} not found`,
            });
        }

        // Add to cart
        const cartItem = {
            productId,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            qty,
        };

        const cart = CartModel.addItem(userid, cartItem);
        const totals = calculateTotals(cart.items);

        res.status(201).json({
            success: true,
            message: 'Item added to cart',
            data: {
                userId: userid,
                items: cart.items,
                subtotal: totals.subtotal,
                tax: totals.tax,
                total: totals.total,
            },
        });
    } catch (error) {
        console.error('❌ Error in addToCart:', error);
        next(error);
    }
};

// DELETE item from cart
exports.removeFromCart = (req, res, next) => {
    try {
        const { userid } = req.headers;
        const { cartId } = req.params;

        if (!userid) {
            return res.status(400).json({
                success: false,
                error: 'userId header is required',
            });
        }

        if (!cartId) {
            return res.status(400).json({
                success: false,
                error: 'cartId is required',
            });
        }

        const cart = CartModel.removeItem(userid, cartId);

        if (!cart) {
            return res.status(404).json({
                success: false,
                error: 'Cart not found',
            });
        }

        const totals = calculateTotals(cart.items);

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            data: {
                userId: userid,
                items: cart.items,
                subtotal: totals.subtotal,
                tax: totals.tax,
                total: totals.total,
            },
        });
    } catch (error) {
        console.error('❌ Error in removeFromCart:', error);
        next(error);
    }
};

// UPDATE cart item quantity
exports.updateCartQty = (req, res, next) => {
    try {
        const { userid } = req.headers;
        const { cartId } = req.params;
        const { qty } = req.body;

        if (!userid) {
            return res.status(400).json({
                success: false,
                error: 'userId header is required',
            });
        }

        if (!qty || typeof qty !== 'number' || qty < 1) {
            return res.status(400).json({
                success: false,
                error: 'qty must be a positive number',
            });
        }

        const cart = CartModel.updateItemQty(userid, cartId, qty);

        if (!cart) {
            return res.status(404).json({
                success: false,
                error: 'Cart not found',
            });
        }

        const totals = calculateTotals(cart.items);

        res.status(200).json({
            success: true,
            message: 'Cart quantity updated',
            data: {
                userId: userid,
                items: cart.items,
                subtotal: totals.subtotal,
                tax: totals.tax,
                total: totals.total,
            },
        });
    } catch (error) {
        console.error('❌ Error in updateCartQty:', error);
        next(error);
    }
};

// CLEAR entire cart
exports.clearCart = (req, res, next) => {
    try {
        const { userid } = req.headers;

        if (!userid) {
            return res.status(400).json({
                success: false,
                error: 'userId header is required',
            });
        }

        const cart = CartModel.clearCart(userid);

        res.status(200).json({
            success: true,
            message: 'Cart cleared',
            data: {
                userId: userid,
                items: [],
                subtotal: 0,
                tax: 0,
                total: 0,
            },
        });
    } catch (error) {
        console.error('❌ Error in clearCart:', error);
        next(error);
    }
};