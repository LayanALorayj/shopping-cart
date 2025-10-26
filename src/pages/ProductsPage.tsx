import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import "../App.css";

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { categories, products, loading, error } = useProducts(category);

  const handleCategoryClick = (slug: string) => {
    const newCategory = slug === "all" ? "" : slug;
    navigate(`/products/${newCategory}`);
  };

  const currentCategoryName = useMemo(() => {
    if (!category || category === "all") return t("products.allProducts");
    const cat = categories.find((c) => c.slug === category);
    return cat ? t(`categories.${cat.slug}`) || cat.name : category;
  }, [category, categories, t]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        <ClockCircleTwoTone
          twoToneColor="#bc6789"
          style={{ fontSize: "36px", marginRight: "10px" }}
        />
        {t("products.loading")}
      </p>
    );

  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {error}
      </p>
    );

  return (
    <div className="products-page" style={{ padding: "20px" }}>
      <div className="category-section">
        <h1 className="hp-title category-title">{currentCategoryName}</h1>
        <Space className="category-buttons" wrap>
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              className={`category-btn ${category === cat.slug ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat.slug)}
            >
              {t(`categories.${cat.slug}`) || cat.name}
            </Button>
          ))}
        </Space>
      </div>

      <div
        className="products-container custom-grid-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "28px",
          padding: "24px 0",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            {t("products.noProducts")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
