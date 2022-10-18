import { createContext, useEffect, useState } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => { },
  cartItems: [],
  setCartItems: () => { },
  addItemToCart: () => { },
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  useEffect(() => {
    const newCardCount = cartItems.reduce(
      (total, cartItem) => { return total + cartItem.quantity },
      0
    );
    setCartCount(newCardCount);
  }, [cartItems]);

  const value = { isCartOpen, setIsOpen, cartItems, addItemToCart, cartCount };


  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};