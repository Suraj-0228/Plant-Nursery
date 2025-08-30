import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Plant {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  careLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface CartItem extends Plant {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (plant: Plant) => {
    setItems(current => {
      const existingItem = current.find(item => item.id === plant.id);
      if (existingItem) {
        return current.map(item =>
          item.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...plant, quantity: 1 }];
    });
  };

  const removeFromCart = (plantId: string) => {
    setItems(current => current.filter(item => item.id !== plantId));
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    
    setItems(current =>
      current.map(item =>
        item.id === plantId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}