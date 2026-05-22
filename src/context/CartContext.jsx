import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "./useCart";
const STORAGE_KEY = "soft-current-cart";

function getStoredCartItems() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCartItems);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const isInCart = useCallback(
    (productId) => cartItems.some((item) => item.id === productId),
    [cartItems],
  );

  const addToCart = useCallback((product) => {
    setCartItems((currentItems) => {
      if (currentItems.some((item) => item.id === product.id)) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleCartItem = useCallback((product) => {
    let wasAdded = false;

    setCartItems((currentItems) => {
      if (currentItems.some((item) => item.id === product.id)) {
        return currentItems.filter((item) => item.id !== product.id);
      }

      wasAdded = true;
      return [...currentItems, product];
    });

    return wasAdded;
  }, []);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.price || 0),
        0,
      ),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      clearCart,
      removeFromCart,
      toggleCartItem,
      isInCart,
      totalPrice,
    }),
    [
      addToCart,
      cartItems,
      clearCart,
      isInCart,
      removeFromCart,
      toggleCartItem,
      totalPrice,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
