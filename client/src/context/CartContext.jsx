import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useModal } from './ModalContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
  });

  const { user } = useContext(AuthContext);
  const { showPopup } = useModal();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (plant) => {
    if (!user) {
      showPopup({
        title: 'Authentication Required',
        message: 'Please log in to add plants to your cart!',
        type: 'error'
      });
      return;
    }

    const isItemInCart = cartItems.find(item => item._id === plant._id);

    if (isItemInCart) {
        setCartItems(prevItems =>
            prevItems.map(item =>
              item._id === plant._id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    } else {
        showPopup({
          title: 'Added to Cart',
          message: `${plant.name} has been added to your shopping cart.`,
          type: 'success'
        });
        setCartItems(prevItems => [...prevItems, { ...plant, quantity: 1 }]);
    }
  };

  const removeFromCart = (plantId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== plantId));
  };

  const updateQuantity = (plantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(plantId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === plantId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};