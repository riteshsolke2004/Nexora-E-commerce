// ==================== CONFIGURATION ====================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://e-commerce-4kpd.onrender.com';

// Generate or get userId from localStorage
const getUserId = (): string => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// ==================== INTERFACES ====================

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  image?: string;
  category?: string;
  subcategory?: string;        // ✅ ADD THIS
  stock?: number;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  discount?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  image?: string;
  qty: number;
  quantity: number;
  description?: string;
}

export interface Cart {
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface Receipt {
  receiptId: string;
  name: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  timestamp: string;
  status: string;
}

export interface CheckoutPayload {
  name: string;
  email: string;
  cartItems: CartItem[];
}

export interface OrderItem {
  cartId?: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  quantity?: number;
}

export interface Order {
  receiptId: string;
  orderId?: string;
  id?: string;
  name: string;
  email: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  timestamp: string;
  status: 'completed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date?: string;
}

// ==================== HELPER FUNCTIONS ====================

// Helper function to normalize CartItem
export const normalizeCartItem = (item: any): CartItem => {
  return {
    id: item.cartId || item.id || '',
    cartId: item.cartId || item.id || '',
    productId: item.productId || '',
    name: item.name || '',
    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
    imageUrl: item.imageUrl || item.image,
    image: item.image || item.imageUrl,
    qty:
      typeof item.qty === 'string'
        ? parseInt(item.qty, 10)
        : item.qty || item.quantity,
    quantity:
      typeof item.quantity === 'string'
        ? parseInt(item.quantity, 10)
        : item.quantity ||
          (typeof item.qty === 'string' ? parseInt(item.qty, 10) : item.qty),
    description: item.description,
  };
};

// ==================== API REQUEST HANDLER ====================

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const userId = getUserId();

  console.log('🔑 userId from localStorage:', userId); // Debug log

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    userId: userId, // Make sure this is being sent
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  console.log('📤 Sending request with headers:', config.headers); // Debug log

  try {
    console.log(`📡 ${options.method || 'GET'} ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || `HTTP ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
}

// ==================== PRODUCT API ====================

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Product[] }>(
      '/products'
    );
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Product }>(
      `/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product by ID:', error);
    throw error;
  }
};

// ✅ NEW: Fetch products by subcategory
export const fetchProductsBySubcategory = async (
  subcategory: string
): Promise<Product[]> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Product[] }>(
      `/products?subcategory=${encodeURIComponent(subcategory)}`
    );
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch products by subcategory:', error);
    throw error;
  }
};

// ✅ NEW: Fetch products by category
export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Product[] }>(
      `/products?category=${encodeURIComponent(category)}`
    );
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    throw error;
  }
};

// ✅ NEW: Fetch products by brand
export const fetchProductsByBrand = async (
  brand: string
): Promise<Product[]> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Product[] }>(
      `/products?brand=${encodeURIComponent(brand)}`
    );
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch products by brand:', error);
    throw error;
  }
};

// ==================== CART API ====================

export const fetchCart = async (): Promise<Cart> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Cart }>(
      '/cart'
    );
    const normalizedItems = response.data.items.map(normalizeCartItem);
    return {
      ...response.data,
      items: normalizedItems,
    };
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return { items: [], subtotal: 0, tax: 0, total: 0 };
  }
};

export const addToCart = async (
  productId: string,
  quantity: number = 1
): Promise<Cart> => {
  try {
    const qty =
      typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
    const response = await apiRequest<{ success: boolean; data: Cart }>(
      '/cart',
      {
        method: 'POST',
        body: JSON.stringify({ productId, qty }),
      }
    );
    const normalizedItems = response.data.items.map(normalizeCartItem);
    return {
      ...response.data,
      items: normalizedItems,
    };
  } catch (error) {
    console.error('Failed to add to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (cartId: string): Promise<Cart> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Cart }>(
      `/cart/${cartId}`,
      { method: 'DELETE' }
    );
    const normalizedItems = response.data.items.map(normalizeCartItem);
    return {
      ...response.data,
      items: normalizedItems,
    };
  } catch (error) {
    console.error('Failed to remove from cart:', error);
    throw error;
  }
};

export const updateCartQuantity = async (
  cartId: string,
  quantity: number
): Promise<Cart> => {
  try {
    const qty =
      typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
    const response = await apiRequest<{ success: boolean; data: Cart }>(
      `/cart/${cartId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ qty }),
      }
    );
    const normalizedItems = response.data.items.map(normalizeCartItem);
    return {
      ...response.data,
      items: normalizedItems,
    };
  } catch (error) {
    console.error('Failed to update cart quantity:', error);
    throw error;
  }
};

export const clearCartAPI = async (): Promise<void> => {
  try {
    await apiRequest<{ success: boolean }>('/cart', {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Failed to clear cart:', error);
    throw error;
  }
};

// ==================== CHECKOUT API ====================

export const checkoutAPI = async (
  payload: CheckoutPayload
): Promise<Receipt> => {
  try {
    // Transform cartItems to match backend format
    const cartItems = payload.cartItems.map((item) => ({
      cartId: item.cartId || item.id,
      productId: item.productId,
      name: item.name,
      price:
        typeof item.price === 'string' ? parseFloat(item.price) : item.price,
      qty:
        typeof item.quantity === 'string'
          ? parseInt(item.quantity, 10)
          : item.quantity,
    }));

    const response = await apiRequest<{ success: boolean; data: Receipt }>(
      '/checkout',
      {
        method: 'POST',
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          cartItems,
        }),
      }
    );

    return response.data;
  } catch (error) {
    console.error('Checkout failed:', error);
    throw error;
  }
};

export const getReceipt = async (receiptId: string): Promise<Receipt> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Receipt }>(
      `/checkout/receipt/${receiptId}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get receipt:', error);
    throw error;
  }
};

// ==================== ORDERS API ====================

export const getOrdersByEmail = async (email: string): Promise<Order[]> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Order[] }>(
      `/checkout/receipts/email?email=${encodeURIComponent(email)}`
    );
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw error;
  }
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await apiRequest<{ success: boolean; data: Order }>(
      `/checkout/receipt/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order:', error);
    throw error;
  }
};

// ==================== AUTHENTICATION API ====================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    return response;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};
