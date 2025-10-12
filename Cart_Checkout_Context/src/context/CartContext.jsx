import { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  
  const [cartItems, setCartItems] = useState(() =>{
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, quantity = 1) {

    setCartItems((prevItems) => {

      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: quantity}
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}       