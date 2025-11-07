const express = require('express');
const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

router.post('/', checkoutController.checkout);
router.get('/receipt/:receiptId', checkoutController.getReceipt);
router.get('/receipts/email', checkoutController.getReceiptsByEmail);

module.exports = router;