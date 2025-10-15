import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type State = {
  count: number;
  cartList: Product[];
};

type Actions = {
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  loadCartFromStorage: () => void;
};

const useCartStore = create<State & Actions>()(
  immer((set) => ({
    count: 0,
    cartList: [],

    addItem: (product) => {
      set((state) => {
        const exists = state.cartList.some((p) => p.id === product.id);
        if (!exists) {
          state.cartList.push(product);
          state.count = state.cartList.length;
          localStorage.setItem("cartItems", JSON.stringify(state.cartList));
        }
      });
    },

    removeItem: (id) => {
      set((state) => {
        state.cartList = state.cartList.filter((item) => item.id !== id);
        state.count = state.cartList.length;
        localStorage.setItem("cartItems", JSON.stringify(state.cartList));
      });
    },

    loadCartFromStorage: () => {
      const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
      set(() => ({
        cartList: stored,
        count: stored.length,
      }));
    },
  }))
);

export default useCartStore;
