import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ErrorBoundary, Header ,AppFooter} from "./components";
import { THEME_CONFIG } from "./constants";
import i18n from "./translation/i18n";
import "./translation/i18n";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ContactUs = lazy(() => import("./pages/ContactPage"));
const RegisterPage = lazy(() => import("./pages/Register"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

const App: React.FC = () => {
  
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n.language]);

  return (
      <ErrorBoundary>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: THEME_CONFIG.primaryColor,
        borderRadius: THEME_CONFIG.borderRadius,
        fontFamily: THEME_CONFIG.fontFamily,
      },
    }}
  >
    <Router>
      <div className="app-container">
        <Header />
        <div className="app-content">
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
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Suspense>
        </div>
        <AppFooter />
      </div>
    </Router>
  </ConfigProvider>
</ErrorBoundary>
  );
};

export default App;
