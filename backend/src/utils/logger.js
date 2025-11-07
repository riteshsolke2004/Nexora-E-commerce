const log = {
    info: (message, data = '') => {
        console.log(`ℹ️  [INFO] ${message}`, data);
    },
    error: (message, error = '') => {
        console.error(`❌ [ERROR] ${message}`, error);
    },
    success: (message, data = '') => {
        console.log(`✅ [SUCCESS] ${message}`, data);
    },
    debug: (message, data = '') => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`🐛 [DEBUG] ${message}`, data);
        }
    },
};

module.exports = log;