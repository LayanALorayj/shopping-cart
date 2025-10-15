import React, { useLayoutEffect, useCallback } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate } from "react-router-dom";
import "../App.css"; 

const HomePage: React.FC = () => {
  const { 
    categories, 
    loadCategories,
    testCounter,
    incrementTest
  } = useProductStore();
  
  const navigate = useNavigate();

  const initializeCategories = useCallback(() => {
    loadCategories();
  }, [loadCategories]);

  useLayoutEffect(() => {
    initializeCategories();
  }, [initializeCategories]);

  if (categories.loading) return <div className="hp-loading">Loading...</div>;
  if (categories.error) return <div className="hp-error">Error: {categories.error}</div>;

  return (
    <div className="home-page">
      <h1 className="hp-title">Categories</h1>
      
      {/* DevTools Test Button */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button 
          onClick={incrementTest}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test DevTools (Counter: {testCounter})
        </button>
      </div>

      <div className="category-grid">
        {categories.data.map((cat) => (
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
