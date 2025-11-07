const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const formatPrice = (price) => {
    return parseFloat(price.toFixed(2));
};

const generateId = (prefix = 'id') => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

module.exports = {
    validateEmail,
    formatPrice,
    generateId,
};