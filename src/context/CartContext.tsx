import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "./useCart";
import type { CartContextValue, CartItem } from "../types/cart";
import type { Product } from "../types/product";

const STORAGE_KEY = "soft-current-cart";

function getStoredCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);
    const parsedCart: unknown = savedCart ? JSON.parse(savedCart) : [];

    return Array.isArray(parsedCart) ? (parsedCart as CartItem[]) : [];
  } catch {
    return [];
  }
}

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(getStoredCartItems);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const isInCart = useCallback(
    (productId: string) => cartItems.some((item) => item.id === productId),
    [cartItems],
  );

  const addToCart = useCallback((product: Product) => {
    setCartItems((currentItems) => {
      if (currentItems.some((item) => item.id === product.id)) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleCartItem = useCallback((product: Product) => {
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
      cartItems.reduce((total, item) => total + Number(item.price || 0), 0),
    [cartItems],
  );

  const value = useMemo<CartContextValue>(
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
