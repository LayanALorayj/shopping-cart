import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DownOutlined, ClockCircleTwoTone } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
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

  const menuItems: MenuProps["items"] = useMemo(() => {
    return [
      ...categories.map((cat) => ({
        key: cat.slug,
        label: cat.name,
      })),
    ];
  }, [categories]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const newCategory = e.key === "all" ? "" : e.key;
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 className="hp-title">{currentCategoryName}</h1>

        <Dropdown
          menu={{
            items: menuItems,
            onClick: handleMenuClick,
            selectedKeys: [selectedCategory],
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space
              style={{
                border: "1px solid #713131ff",
                padding: "5px 10px",
                borderRadius: "5px",
                background: "#f0d8e2ff",
                cursor: "pointer",
              }}
            >
              {currentCategoryName}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
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
