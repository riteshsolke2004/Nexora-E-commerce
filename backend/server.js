require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = require('./src/app');

const PORT = process.env.PORT || 5000;

// ==================== DATABASE CONNECTION ====================
const connectDB = async() => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('❌ MONGODB_URI is not defined in .env');
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

// ==================== START SERVER ====================
const startServer = async() => {
    try {
        // Connect to MongoDB FIRST
        await connectDB();

        // Start server AFTER DB connection
        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════════╗
║  🚀 E-Commerce Backend Server Started      ║
╠════════════════════════════════════════════╣
║  📍 Port: ${PORT}
║  🌍 Environment: ${process.env.NODE_ENV || 'development'}
║  💾 Database: Connected ✅
║  🛡️  CORS: Enabled ✅
║  🔐 JWT: ${process.env.JWT_SECRET ? '✅' : '❌'}
╚════════════════════════════════════════════╝
      `);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('⚠️  SIGTERM received, shutting down gracefully...');
    mongoose.connection.close();
    process.exit(0);
});