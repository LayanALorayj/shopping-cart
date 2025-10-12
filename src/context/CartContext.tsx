import React, { createContext, useContext, useReducer, useEffect } from "react";

type CartState = {
  count: number;
};

type CartAction = { type: "ADD" };

const CartContext = createContext<{
  state: CartState;
  addToCart: () => void;
}>({
  state: { count: 0 },
  addToCart: () => {},
});

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: CartState = {
    count: Number(localStorage.getItem("cartCount")) || 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = () => dispatch({ type: "ADD" });

  useEffect(() => {
    localStorage.setItem("cartCount", String(state.count));
  }, [state.count]);

  return (
    <CartContext.Provider value={{ state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
