import React from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import "../App.css"; 

const HomePage: React.FC = () => {
  const { categories, loading, error } = useProducts();
  const navigate = useNavigate();

  if (loading) return <div className="hp-loading">Loading...</div>;
  if (error) return <div className="hp-error">Error: {error}</div>;

  return (
    <div className="home-page">
      <h1 className="hp-title">Categories</h1>
  
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
            <h3 className="category-name">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
