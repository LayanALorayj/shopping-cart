import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import "./api/User";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ContactUs = lazy(() => import("./pages/ContactPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/Profile"));

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "100px", fontSize: "18px" }}>
            ⏳ Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
