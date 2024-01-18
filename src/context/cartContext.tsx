import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../services/restaurantAPI';
import { IDish } from '@/types/dish';
interface CartItems {
  id: number;
  total: number;
  subTotal: number;
  userId: number;
  dishes: { dishData: IDish; quantity: number; subtotal: number }[];
}
interface CartContextProps {
  cartItems: CartItems;
  allDishesQuantity: number;
  isLoadingCart: boolean;
  addToCart: (productId: number) => Promise<void>;
  removeAllFromCart: () => Promise<void>;
  removeFromCartById: (productId: number) => Promise<void>;
  updateCartItemQuantity: (
    productId: number,
    quantityModifier: number,
  ) => Promise<void>;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems>({} as CartItems);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axiosInstance.get('/cart');
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setIsLoadingCart(false);
      }
    };

    setTimeout(() => {
      fetchCart();
    }, 1500);
  }, []);

  const addToCart = async (productId: number) => {
    try {
      const { data } = await axiosInstance.post('/cart', { productId });
      setCartItems(data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeAllFromCart = async () => {
    try {
      const { data } = await axiosInstance.delete('/cart');
      setCartItems(data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const removeFromCartById = async (productId: number) => {
    try {
      const { data } = await axiosInstance.delete(`/cart/${productId}`);
      setCartItems(data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItemQuantity = async (
    productId: number,
    quantityModifier: number,
  ) => {
    try {
      const { data } = await axiosInstance.patch(`/cart`, {
        quantityModifier,
        productId,
      });
      setCartItems(data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const allDishesQuantity = cartItems?.dishes?.reduce((total, item) => {
    const allDishes = total + item.quantity;
    return allDishes;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeAllFromCart,
        removeFromCartById,
        updateCartItemQuantity,
        isLoadingCart,
        allDishesQuantity,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
