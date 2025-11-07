// Mock Product Database
const products = [{
        id: 'p1',
        name: 'Vibe Tee',
        price: 19.99,
        description: 'Premium cotton t-shirt with Vibe branding',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        category: 'Fashion',
        stock: 100,
    },
    {
        id: 'p2',
        name: 'Vibe Cap',
        price: 12.5,
        description: 'Comfortable adjustable cap',
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        category: 'Fashion',
        stock: 150,
    },
    {
        id: 'p3',
        name: 'Vibe Water Bottle',
        price: 24.99,
        description: 'Insulated stainless steel water bottle',
        imageUrl: 'https://images.unsplash.com/photo-1609154656663-c7791b62ae6b?w=500',
        category: 'Accessories',
        stock: 200,
    },
    {
        id: 'p4',
        name: 'Vibe Hoodie',
        price: 49.99,
        description: 'Cozy pullover hoodie',
        imageUrl: 'https://images.unsplash.com/photo-1556821552-3a63f67cfb5f?w=500',
        category: 'Fashion',
        stock: 75,
    },
    {
        id: 'p5',
        name: 'Vibe Sneakers',
        price: 89.99,
        description: 'Comfortable everyday sneakers',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        category: 'Footwear',
        stock: 50,
    },
    {
        id: 'p6',
        name: 'Vibe Backpack',
        price: 59.99,
        description: 'Durable laptop backpack',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        category: 'Accessories',
        stock: 120,
    },
    {
        id: 'p7',
        name: 'Vibe Sunglasses',
        price: 79.99,
        description: 'UV protection sunglasses',
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        category: 'Accessories',
        stock: 80,
    },
    {
        id: 'p8',
        name: 'Vibe Sports Watch',
        price: 99.99,
        description: 'Digital sports watch with fitness tracking',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category: 'Electronics',
        stock: 60,
    },
];

class ProductModel {
    static getAll() {
        return products;
    }

    static getById(id) {
        return products.find((p) => p.id === id);
    }

    static create(productData) {
        const newProduct = {
            id: `p${Date.now()}`,
            createdAt: new Date(),
            ...productData,
        };
        products.push(newProduct);
        return newProduct;
    }

    static exists(id) {
        return products.some((p) => p.id === id);
    }
}

module.exports = ProductModel;