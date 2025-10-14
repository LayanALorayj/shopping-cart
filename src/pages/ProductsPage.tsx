import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";
import "../App.css";

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const {
    categories,
    products,
    selectedCategory,
    loading,
    error,
    fetchCategories,
    fetchProducts,
    setSelectedCategory,
  } = useProductStore();

  useEffect(() => {
    const categorySlug = category || "all";

    if (categories.length === 0) {
      fetchCategories();
    }

    setSelectedCategory(categorySlug);
    fetchProducts(categorySlug);
  }, [category, fetchCategories, fetchProducts, setSelectedCategory]);

  const handleCategoryClick = (slug: string) => {
    const newCategory = slug === "all" ? "" : slug;
    navigate(`/products/${newCategory}`);
  };

  const currentCategoryName = useMemo(() => {
    if (selectedCategory === "all") return "All Products";
    const cat = categories.find((c) => c.slug === selectedCategory);
    return cat ? cat.name : selectedCategory;
  }, [selectedCategory, categories]);

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        <ClockCircleTwoTone
          twoToneColor="#bc6789"
          style={{ fontSize: "36px", marginRight: "10px" }}
        />
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        Error: {error}
      </p>
    );
  }

  return (
    <div className="products-page" style={{ padding: "20px" }}>
      <div className="category-section">
        <h1 className="hp-title category-title">{currentCategoryName}</h1>

        <Space className="category-buttons" wrap>
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              className={`category-btn ${
                selectedCategory === cat.slug ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </Space>
      </div>

      <div
        className="products-container custom-grid-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
