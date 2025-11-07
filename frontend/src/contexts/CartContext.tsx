import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Cart,
  CartItem,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity,
  fetchCart,
  clearCartAPI,
} from '@/lib/api';
import { toast } from 'sonner';

interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  addToCart: (productId: string, productName: string, quantity?: number) => Promise<void>;
  removeFromCart: (cartId: string) => Promise<void>;
  updateQuantity: (cartId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setIsLoading(true);
    try {
      const cartData = await fetchCart();
      setCart(cartData);
      console.log('✅ Cart loaded:', cartData);
    } catch (error) {
      console.error('❌ Failed to load cart:', error);
      setCart({ items: [], subtotal: 0, tax: 0, total: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (
    productId: string,
    productName: string,
    quantity: number = 1
  ) => {
    setIsLoading(true);
    try {
      // Ensure quantity is a number
      const qty = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
      
      const updatedCart = await apiAddToCart(productId, qty);
      setCart(updatedCart);
      toast.success(`${productName} added to cart!`, {
        description: `Quantity: ${qty}`,
      });
      console.log('✅ Item added to cart:', updatedCart);
    } catch (error: any) {
      console.error('❌ Failed to add to cart:', error);
      toast.error(error.message || 'Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartId: string) => {
    setIsLoading(true);
    try {
      const updatedCart = await apiRemoveFromCart(cartId);
      setCart(updatedCart);
      toast.success('Item removed from cart');
      console.log('✅ Item removed from cart:', updatedCart);
    } catch (error: any) {
      console.error('❌ Failed to remove from cart:', error);
      toast.error(error.message || 'Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartId: string, quantity: number) => {
    // Ensure quantity is a number
    const qty = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
    
    if (qty < 1) {
      await removeFromCart(cartId);
      return;
    }

    setIsLoading(true);
    try {
      const updatedCart = await apiUpdateCartQuantity(cartId, qty);
      setCart(updatedCart);
      console.log('✅ Quantity updated:', updatedCart);
    } catch (error: any) {
      console.error('❌ Failed to update quantity:', error);
      toast.error(error.message || 'Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await clearCartAPI();
      setCart({ items: [], subtotal: 0, tax: 0, total: 0 });
      toast.success('Cart cleared');
      console.log('✅ Cart cleared');
    } catch (error: any) {
      console.error('❌ Failed to clear cart:', error);
      toast.error(error.message || 'Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to safely get quantity
  const getItemQuantity = (item: CartItem): number => {
    const qty = item.quantity ?? item.qty;
    return typeof qty === 'string' ? parseInt(qty, 10) : qty;
  };

  // Calculate item count
  const itemCount = cart.items.reduce((sum, item) => sum + getItemQuantity(item), 0);

  // Get total items
  const getTotalItems = () => {
    return cart.items.reduce((sum, item) => sum + getItemQuantity(item), 0);
  };

  // Get subtotal
  const getSubtotal = () => {
    return cart.items.reduce((sum, item) => {
      const qty = getItemQuantity(item);
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return sum + price * qty;
    }, 0);
  };

  // Get tax
  const getTax = () => {
    const tax = typeof cart.tax === 'string' ? parseFloat(cart.tax) : cart.tax;
    return isNaN(tax) ? 0 : tax;
  };

  // Get total
  const getTotal = () => {
    const total = typeof cart.total === 'string' ? parseFloat(cart.total) : cart.total;
    return isNaN(total) ? 0 : total;
  };

  const value: CartContextType = {
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
  };

  return (
    <CartContext.Provider value={value}>
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
