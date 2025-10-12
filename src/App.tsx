import React from "react";
import Header from "./components/layout/Header";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import "./App.css"

const App: React.FC = () => {
  return (
    <CartProvider>
      <Header />
      <ProductsPage />
    </CartProvider>
  );
};

export default App;
