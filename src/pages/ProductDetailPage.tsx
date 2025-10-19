import React from "react";
import { useParams } from "react-router-dom";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { useProduct } from "../api/products";
import ProductHeader from "../components/product/ProductHeader";
import ProductImages from "../components/product/ProductImages";
import ProductTabs from "../components/product/ProductTabs";
import "../components/product/ProductDetailPage.css";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        <ClockCircleTwoTone
          twoToneColor="#bc6789"
          style={{ fontSize: "36px", marginRight: "10px" }}
        />
        Loading product...
      </p>
    );

  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {error}
      </p>
    );

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <ProductHeader product={product} />
      <div className="product-detail-body">
        <ProductImages images={product.images} />
        <ProductTabs product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
