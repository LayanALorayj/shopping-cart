import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { Product } from '../types/product';

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartStore {
  cartList: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  loadCartFromStorage: () => void;
}

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cartList: [],
        
        addItem: (product: Product) => {
          const { cartList } = get();
          const existingItem = cartList.find(item => item.product.id === product.id);
          
          if (existingItem) {
            set({
              cartList: cartList.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            });
          } else {
            set({
              cartList: [...cartList, { id: product.id, product, quantity: 1 }]
            });
          }
        },
        
        removeItem: (productId: number) => {
          set({
            cartList: get().cartList.filter(item => item.product.id !== productId)
          });
        },
        
        updateQuantity: (productId: number, quantity: number) => {
          if (quantity <= 0) {
            get().removeItem(productId);
            return;
          }
          
          set({
            cartList: get().cartList.map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            )
          });
        },
        
        clearCart: () => {
          set({ cartList: [] });
        },
        
        loadCartFromStorage: () => {
          // This is handled by the persist middleware
        },
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({ cartList: state.cartList }),
      }
    ),
    {
      name: 'cart-store',
    }
  )
);

export default useCartStore;
