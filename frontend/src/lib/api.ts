// API integration layer for Vibe Commerce
// This connects to the backend REST API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface CheckoutData {
  name: string;
  email: string;
  cartItems: CartItem[];
}

export interface CheckoutResponse {
  success: boolean;
  orderId: string;
  timestamp: string;
  total: number;
}

// Products API
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data for development
    return getMockProducts();
  }
};

// Cart API
export const fetchCart = async (): Promise<Cart> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    // Return from localStorage for development
    return getCartFromLocalStorage();
  }
};

export const addToCart = async (productId: string, quantity: number = 1): Promise<Cart> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    // Use localStorage fallback
    return addToCartLocalStorage(productId, quantity);
  }
};

export const removeFromCart = async (itemId: string): Promise<Cart> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return await response.json();
  } catch (error) {
    console.error('Error removing from cart:', error);
    return removeFromCartLocalStorage(itemId);
  }
};

export const updateCartQuantity = async (itemId: string, quantity: number): Promise<Cart> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return await response.json();
  } catch (error) {
    console.error('Error updating cart:', error);
    return updateCartQuantityLocalStorage(itemId, quantity);
  }
};

// Checkout API
export const checkout = async (data: CheckoutData): Promise<CheckoutResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Checkout failed');
    return await response.json();
  } catch (error) {
    console.error('Error during checkout:', error);
    // Mock successful checkout
    return {
      success: true,
      orderId: `ORD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      total: data.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.08,
    };
  }
};

// LocalStorage helpers (fallback when API is not available)
const getCartFromLocalStorage = (): Cart => {
  const stored = localStorage.getItem('vibeCommerce_cart');
  if (stored) {
    const items: CartItem[] = JSON.parse(stored);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    return { items, subtotal, tax, total: subtotal + tax };
  }
  return { items: [], subtotal: 0, tax: 0, total: 0 };
};

const saveCartToLocalStorage = (items: CartItem[]): Cart => {
  localStorage.setItem('vibeCommerce_cart', JSON.stringify(items));
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  return { items, subtotal, tax, total: subtotal + tax };
};

const addToCartLocalStorage = (productId: string, quantity: number): Cart => {
  const products = getMockProducts();
  const product = products.find(p => p.id === productId);
  if (!product) throw new Error('Product not found');

  const cart = getCartFromLocalStorage();
  const existingItem = cart.items.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      id: `item-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
  }

  return saveCartToLocalStorage(cart.items);
};

const removeFromCartLocalStorage = (itemId: string): Cart => {
  const cart = getCartFromLocalStorage();
  const updatedItems = cart.items.filter(item => item.id !== itemId);
  return saveCartToLocalStorage(updatedItems);
};

const updateCartQuantityLocalStorage = (itemId: string, quantity: number): Cart => {
  const cart = getCartFromLocalStorage();
  const item = cart.items.find(i => i.id === itemId);
  if (item) {
    if (quantity <= 0) {
      return removeFromCartLocalStorage(itemId);
    }
    item.quantity = quantity;
  }
  return saveCartToLocalStorage(cart.items);
};

// Mock data for development
const getMockProducts = (): Product[] => [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality audio with active noise cancellation',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Fitness tracking and smart notifications',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
  {
    id: '3',
    name: 'Designer Sunglasses',
    description: 'UV protection with modern style',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
  },
  {
    id: '4',
    name: 'Leather Backpack',
    description: 'Durable and spacious for everyday use',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
  },
  {
    id: '5',
    name: 'Portable Speaker',
    description: 'Waterproof with 360° sound',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
  },
  {
    id: '6',
    name: 'Minimalist Wallet',
    description: 'Slim design with RFID protection',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
  },
  {
    id: '7',
    name: 'Wireless Keyboard',
    description: 'Mechanical keys with RGB lighting',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
  },
  {
    id: '8',
    name: 'Coffee Maker Deluxe',
    description: 'Programmable with thermal carafe',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
  },
];
