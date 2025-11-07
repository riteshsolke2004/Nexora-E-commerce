const express = require('express');
const router = express.Router();

// POST - Signup
router.post('/signup', (req, res) => {
    try {
        const { name, email, password } = req.body;
        // TODO: Create user in MongoDB
        res.json({
            success: true,
            message: 'User registered successfully',
            user: { name, email },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST - Login
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        // TODO: Verify user from MongoDB
        res.json({
            success: true,
            message: 'Login successful',
            token: 'dummy_token',
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;