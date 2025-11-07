const { v4: uuidv4 } = require('uuid');

// In-memory cart storage (key: userId, value: cart object)
const carts = new Map();

class CartModel {
    static getOrCreateCart(userId) {
        if (!carts.has(userId)) {
            carts.set(userId, {
                userId,
                items: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        return carts.get(userId);
    }

    static getCart(userId) {
        return carts.get(userId) || null;
    }

    static addItem(userId, item) {
        const cart = this.getOrCreateCart(userId);

        // Check if item already exists
        const existingItem = cart.items.find((i) => i.productId === item.productId);

        if (existingItem) {
            existingItem.qty += item.qty;
            existingItem.updatedAt = new Date();
        } else {
            cart.items.push({
                cartId: uuidv4(),
                ...item,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        cart.updatedAt = new Date();
        return cart;
    }

    static removeItem(userId, cartId) {
        const cart = this.getCart(userId);
        if (!cart) return null;

        const itemIndex = cart.items.findIndex((i) => i.cartId === cartId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            cart.updatedAt = new Date();
        }

        return cart;
    }

    static updateItemQty(userId, cartId, qty) {
        const cart = this.getCart(userId);
        if (!cart) return null;

        const item = cart.items.find((i) => i.cartId === cartId);
        if (item) {
            item.qty = Math.max(1, qty);
            item.updatedAt = new Date();
            cart.updatedAt = new Date();
        }

        return cart;
    }

    static clearCart(userId) {
        const cart = this.getOrCreateCart(userId);
        cart.items = [];
        cart.updatedAt = new Date();
        return cart;
    }

    static deleteCart(userId) {
        carts.delete(userId);
    }
}

module.exports = CartModel;