import React from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../App.css"; 

const HomePage: React.FC = () => {
  const { categories, loading, error } = useProducts();
  const navigate = useNavigate();
   const {t} = useTranslation();

  if (loading) return <div className="hp-loading">Loading...</div>;
  if (error) return <div className="hp-error">Error: {error}</div>;

  return (
    <div className="home-page">
       <h1 className="hp-title">{t("homepage.title")}</h1>
  
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => navigate(`/products/${cat.slug}`)}
            className="category-card"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(`/products/${cat.slug}`);
            }}
          >
            <h3 className="category-name">{t(`categories.${cat.slug}`)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
