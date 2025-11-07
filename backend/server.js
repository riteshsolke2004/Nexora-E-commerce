require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

const startServer = async() => {
    try {
        // Connect to MongoDB FIRST
        await connectDB();

        // Start server AFTER DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();