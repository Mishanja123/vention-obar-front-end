import { useState } from 'react';
import Swal from 'sweetalert2';
import { Cart, CartItem } from '@/models/cart.model';

export const useCartService = () => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  const addToCart = (item: CartItem) => {
    const items = [...cart.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push({ ...item, quantity: 1 });
    }
    setCart({ items });
    Swal.fire('Success!', '1 item added to cart', 'success');
  };

  const removeFromCart = (item: CartItem, update = true) => {
    const filteredItems = cart.items.filter((_item) => _item.id !== item.id);

    if (update) {
      setCart({ items: filteredItems });
      Swal.fire('Success!', '1 item removed from cart', 'success');
    }

    return filteredItems;
  };

  const removeQuantity = (item: CartItem): void => {
    let itemForRemoval;

    const filteredItems = cart.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      removeFromCart(itemForRemoval, false);
    }

    setCart({ items: filteredItems });
    Swal.fire('Success!', '1 item removed from cart', 'success');
  };

  const getTotal = () => {
    return cart.items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  };

  const clearCart = () => {
    setCart({ items: [] });
    Swal.fire('Success!', 'Cart is clear', 'success');
  };

  return {
    cart,
    addToCart,
    removeQuantity,
    getTotal,
    clearCart,
    removeFromCart,
  };
};
