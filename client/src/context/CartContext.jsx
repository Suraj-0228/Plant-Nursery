import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

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

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (plant) => {
    if (!user) {
      alert('Please, Login to Plant Nursery So, You can Add Plants to Your Cart!!');
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
        alert(`${plant.name} Added to Your Cart.`);
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