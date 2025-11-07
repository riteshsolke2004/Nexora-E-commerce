const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ==================== CORS CONFIGURATION ====================
const corsOptions = {
    origin: [
        'http://localhost:8080',
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:8080',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'https://e-commerce-beryl-five-53.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'userId',
        'X-Requested-With',
        'Accept',
    ],
    exposedHeaders: ['Content-Length', 'X-JSON-Response'],
    maxAge: 86400,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ==================== PREFLIGHT HANDLING ====================
app.options('*', cors(corsOptions));
app.options('/api/*', cors(corsOptions));

// ==================== MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ==================== ROUTES ====================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        corsEnabled: true,
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '✅ E-Commerce API is running',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            cart: '/api/cart',
            checkout: '/api/checkout',
            auth: '/api/auth',
            health: '/health',
        },
    });
});

// ==================== ERROR HANDLERS ====================
// 404 Handler
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.path,
        method: req.method,
    });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;