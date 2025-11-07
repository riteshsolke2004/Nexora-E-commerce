const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateProduct = (productData) => {
    if (!productData.name) return 'Product name is required';
    if (!productData.price || productData.price <= 0) return 'Valid price is required';
    return null;
};

module.exports = {
    validateEmail,
    validateProduct,
};