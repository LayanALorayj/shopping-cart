import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { useProductStore } from "../store/useProductStore";
import ProductHeader from "../components/product/ProductHeader";
import ProductImages from "../components/product/ProductImages";
import ProductTabs from "../components/product/ProductTabs";
import "../components/product/ProductDetailPage.css";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProduct, loadProduct } = useProductStore();

  useEffect(() => {
    if (id) {
      loadProduct(Number(id));
    }
  }, [id, loadProduct]);

  if (currentProduct.loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        <ClockCircleTwoTone
          twoToneColor="#bc6789"
          style={{ fontSize: "36px", marginRight: "10px" }}
        />
        Loading product...
      </p>
    );
  }

  if (currentProduct.error) {
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {currentProduct.error}
      </p>
    );
  }

  if (!currentProduct.data) {
    return null;
  }

  const product = currentProduct.data;

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
