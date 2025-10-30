import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logEvent } from "firebase/analytics";
import { analytics, getUserFromFirestore, auth } from "../Config/firebase";
import "../App.css";
import { Button } from "antd";
import useAuthStore from "../hooks/useAuthStore"; 

const HomePage: React.FC = () => {
  const { categories, loading, error } = useProducts();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user: storeUser, isAuthenticated } = useAuthStore(); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "home_page_viewed");
    }

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && isAuthenticated) { 
        const userData = await getUserFromFirestore(user.uid);

        const role = userData?.role || storeUser?.role; 
        if (role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated, storeUser]); 

  const handleCategoryClick = (slug: string) => {
    if (analytics) {
      logEvent(analytics, "category_clicked", { category_slug: slug });
    }
    navigate(`/products/${slug}`);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  if (authLoading) return <div className="hp-loading">Loading authentication...</div>;
  if (loading) return <div className="hp-loading">Loading categories...</div>;
  if (error) return <div className="hp-error">Error: {error}</div>;

  return (
    <div className="home-page">
      <h1 className="hp-title">{t("homepage.title")}</h1>

      {isAdmin && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button type="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>
      )}

      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug)}
            className="category-card"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCategoryClick(cat.slug);
            }}
          >
            <h3 className="category-name">{t(`categories.${cat.slug}`)}</h3>
          </div>
        ))}

        <div
          onClick={() => handleCategoryClick("newProducts")}
          className="category-card"
          role="button"
          tabIndex={0}
        >
          <h3 className="category-name">New Product</h3>
        </div>
      </div>
    </div>
  );
};

export default HomePage;