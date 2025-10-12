import React, { createContext, useContext, useReducer, useEffect } from "react";

type CartState = {
  count: number;
};

type CartAction = 
  | { type: "ADD" }
  | { type: "SET"; payload: number };

const CartContext = createContext<{
  state: CartState;
  addToCart: () => void;
  setCount: (newCount: number) => void;
  updateCountFromStorage: () => void;
}>({
  state: { count: 0 },
  addToCart: () => {},
  setCount: () => {},
  updateCountFromStorage: () => {},
});

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      return { count: state.count + 1 };
    case "SET":
      return { count: action.payload };
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: CartState = {
    count: Number(localStorage.getItem("cartCount")) || 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = () => {
    dispatch({ type: "ADD" });
  };

  const setCount = (newCount: number) => {
    dispatch({ type: "SET", payload: newCount });
  };

  const updateCountFromStorage = () => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    dispatch({ type: "SET", payload: storedItems.length });
  };

  useEffect(() => {
    localStorage.setItem("cartCount", String(state.count));
  }, [state.count]);

  return (
    <CartContext.Provider value={{ state, addToCart, setCount, updateCountFromStorage }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
