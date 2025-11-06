import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCartQuantity as apiUpdateCartQuantity, fetchCart } from '@/lib/api';
import { toast } from 'sonner';

interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  addToCart: (productId: string, productName: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  itemCount: number;
  // Add these methods
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [], subtotal: 0, tax: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setIsLoading(true);
    try {
      const cartData = await fetchCart();
      setCart(cartData);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, productName: string, quantity = 1) => {
    setIsLoading(true);
    try {
      const updatedCart = await apiAddToCart(productId, quantity);
      setCart(updatedCart);
      toast.success(`${productName} added to cart!`, {
        description: `Quantity: ${quantity}`,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    setIsLoading(true);
    try {
      const updatedCart = await apiRemoveFromCart(itemId);
      setCart(updatedCart);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const updatedCart = await apiUpdateCartQuantity(itemId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    localStorage.removeItem('vibeCommerce_cart');
    setCart({ items: [], subtotal: 0, tax: 0, total: 0 });
  };

  // Calculate item count
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // Method 1: Get total items (same as itemCount)
  const getTotalItems = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Method 2: Get subtotal (sum of all items before tax)
  const getSubtotal = () => {
    return cart.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  };

  // Method 3: Get tax (usually 8% or as per your backend)
  const getTax = () => {
    return cart.tax || (getSubtotal() * 0.08);
  };

  // Method 4: Get total (subtotal + tax)
  const getTotal = () => {
    return cart.total || (getSubtotal() + getTax());
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        getTotalItems,
        getSubtotal,
        getTax,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
