import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../services/restaurantAPI';

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
}

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axiosInstance.get('/cart');
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (productId: number, quantity: number) => {
    try {
      await axiosInstance.post('/cart/add', { productId, quantity });
      const { data } = await axiosInstance.get('/cart');
      setCartItems(data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await axiosInstance.delete(`/cart/remove/${productId}`);
      const { data } = await axiosInstance.get('/cart');
      setCartItems(data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    try {
      await axiosInstance.patch('/cart/update', { productId, quantity });
      const { data } = await axiosInstance.get('/cart');
      setCartItems(data);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
