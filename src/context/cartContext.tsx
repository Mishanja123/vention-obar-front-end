import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../services/restaurantAPI';
import { IDish } from '@/types/dish';
import { useAuth } from '@/hooks/useAuth';
import Swal from 'sweetalert2'; // Добавляем SweetAlert2

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
  const { loggedIn } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (loggedIn) {
          const { data } = await axiosInstance.get('/cart');
          setCartItems(data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        // Добавляем уведомление об ошибке
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error fetching your cart. Please try again later.',
        });
      } finally {
        setIsLoadingCart(false);
      }
    };

    setTimeout(() => {
      fetchCart();
    }, 1500);
  }, [loggedIn]);

  const addToCart = async (productId: number) => {
    try {
      const { data } = await axiosInstance.post('/cart', { productId });
      setCartItems(data);
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        showConfirmButton: false,
        position: 'top-end',
        timer: 1500,
        toast: true,
        customClass: {
          popup: 'swal2-toast',
          title: 'swal2-toast-title',
        },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error adding to your cart. Please try again later.',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast',
          title: 'swal2-toast-title',
        },
      });
    }
  };

  const removeAllFromCart = async () => {
    try {
      const { value: confirmed } = await Swal.fire({
        icon: 'question',
        title: 'Are you sure?',
        text: 'Do you really want to remove all items from your cart?',
        showCancelButton: true,
        confirmButtonColor: '#182715',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, clear it!',
        cancelButtonText: 'No, cancel!',
      });

      if (confirmed) {
        const { data } = await axiosInstance.delete('/cart');
        setCartItems(data);
        await Swal.fire({
          icon: 'success',
          title: 'Cart Cleared!',
          showConfirmButton: false,
          position: 'top-end',
          timer: 1500,
          timerProgressBar: true,
          toast: true,
          customClass: {
            popup: 'swal2-toast',
            title: 'swal2-toast-title',
          },
        });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error removing from your cart. Please try again later.',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast',
          title: 'swal2-toast-title',
        },
      });
    }
  };

  const removeFromCartById = async (productId: number) => {
    try {
      const { data } = await axiosInstance.delete(`/cart/${productId}`);
      setCartItems(data);
      Swal.fire({
        icon: 'success',
        title: 'Dish Tossed!',
        showConfirmButton: false,
        position: 'top-end',
        timer: 1500,
        timerProgressBar: true,
        toast: true,
        customClass: {
          popup: 'swal2-toast',
          title: 'swal2-toast-title',
        },
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error removing from your cart. Please try again later.',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast',
          title: 'swal2-toast-title',
        },
      });
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
      console.error('Error updating cart:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error updating your cart. Please try again later.',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast',
          title: 'swal2-toast-title',
        },
      });
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
