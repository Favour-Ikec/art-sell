import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add an art piece; if already present, increase qty
  function addToCart(art) {
    setCart(prev =>
      prev.some(item => item.slug === art.slug)
        ? prev.map(item =>
            item.slug === art.slug
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        : [...prev, { ...art, qty: 1 }]
    );
  }

  // Remove an art piece
  function removeFromCart(slug) {
    setCart(prev => prev.filter(item => item.slug !== slug));
  }

  // Change qty
  function setQty(slug, qty) {
    setCart(prev =>
      prev.map(item =>
        item.slug === slug ? { ...item, qty: qty } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
