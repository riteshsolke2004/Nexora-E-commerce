const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ==================== CORS CONFIGURATION ====================
// Allow custom headers including 'userId'
const corsOptions = {
    origin: [
        'http://localhost:8080',
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:8080',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    // IMPORTANT: Include custom headers
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'userId', // THIS IS IMPORTANT
        'X-Requested-With',
        'Accept',
    ],
    exposedHeaders: ['Content-Length', 'X-JSON-Response'],
    maxAge: 86400,
    optionsSuccessStatus: 200, // For legacy browsers
};

app.use(cors(corsOptions));

// ==================== PREFLIGHT HANDLING ====================
// Handle preflight requests explicitly
app.options('*', cors(corsOptions));
app.options('/api/*', cors(corsOptions));

// ==================== MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging (shows headers)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    next();
});

// ==================== ROUTES ====================
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ==================== ERROR HANDLERS ====================
// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use(errorHandler);

module.exports = app;