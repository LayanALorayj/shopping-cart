import type { Product } from './product';

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  addedAt: string;
};

export type CartSlice = {
  // State
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;

  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (productId: number) => number;
  isInCart: (productId: number) => boolean;
};
