import React, { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logEvent } from "firebase/analytics";
import { analytics } from "../Config/firebase";
import "../App.css";

const HomePage: React.FC = () => {
  const { categories, loading, error } = useProducts();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "home_page_viewed");
    }
  }, []);

  const handleCategoryClick = (slug: string) => {
    if (analytics) {
      logEvent(analytics, "category_clicked", { category_slug: slug });
    }
    navigate(`/products/${slug}`);
  };

  if (loading) return <div className="hp-loading">Loading...</div>;
  if (error) return <div className="hp-error">Error: {error}</div>;

  return (
    <div className="home-page">
      <h1 className="hp-title">{t("homepage.title")}</h1>

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
      </div>
    </div>
  );
};

export default HomePage;
