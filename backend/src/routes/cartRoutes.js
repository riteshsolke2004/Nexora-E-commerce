const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/:cartId', cartController.removeFromCart);
router.put('/:cartId', cartController.updateCartQty);
router.delete('/', cartController.clearCart);

module.exports = router;