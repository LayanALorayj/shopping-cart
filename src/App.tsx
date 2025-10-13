import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />      
        <Route path="/products/:category" element={<ProductsPage />} /> 
        <Route path="/cart" element={<CartPage />} />  
      </Routes>
    </Router>
  );
};

export default App;
