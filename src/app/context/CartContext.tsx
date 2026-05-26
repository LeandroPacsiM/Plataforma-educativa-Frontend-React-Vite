import React, { createContext, useContext, useState, ReactNode } from 'react';
import { COURSES } from '../data/mockData';

type CartContextType = {
  cartItems: string[]; // Array of course IDs
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  const addToCart = (courseId: string) => {
    if (!cartItems.includes(courseId)) {
      setCartItems([...cartItems, courseId]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCartItems(cartItems.filter(id => id !== courseId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, id) => {
    const course = COURSES.find(c => c.id === id);
    return total + (course?.price || 0);
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
