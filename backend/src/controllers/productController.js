const ProductModel = require('../models/Product');

// GET all products
exports.getAllProducts = (req, res, next) => {
    try {
        const products = ProductModel.getAll();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

// GET single product
exports.getProductById = (req, res, next) => {
    try {
        const { id } = req.params;
        const product = ProductModel.getById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: `Product with ID ${id} not found`,
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};