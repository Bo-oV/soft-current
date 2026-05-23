import type { Product } from "./product";

export type CartItem = Product & {
  quantity?: number;
};

export type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleCartItem: (product: Product) => boolean;
  isInCart: (productId: string) => boolean;
  clearCart: () => void;
  totalPrice: number;
};

export type CheckoutFormData = {
  name: string;
  phone: string;
  cityName: string;
  cityRef?: string;
  warehouse: string;
  warehouseRef?: string;
  message: string;
};
