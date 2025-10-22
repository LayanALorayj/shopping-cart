import React from "react";
import { useParams } from "react-router-dom";
import { ClockCircleTwoTone } from "@ant-design/icons";
// import { useProduct } from "../api/products";
import ProductHeader from "../components/product/ProductHeader";
import ProductImages from "../components/product/ProductImages";
import ProductTabs from "../components/product/ProductTabs";
import styles from "../components/product/ProductDetailPage.module.css";
import useProduct from "../hooks/useProduct";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);

  if (loading)
    return (
      <div className={styles.loading}>
        <ClockCircleTwoTone
          twoToneColor="#bc6789"
          style={{ fontSize: "36px", marginRight: "10px" }}
        />
        Loading product...
      </div>
    );

  if (error)
    return (
      <div className={styles.error}>
        {error}
      </div>
    );

  if (!product) return null;

  return (
    <div className={styles.container}>
      <div className={styles.mainLayout}>
        <div className={styles.imagesSection}>
          <ProductImages images={product.images} />
        </div>
        <div className={styles.infoSection}>
          <ProductHeader product={product} />
        </div>
      </div>
      <div className={styles.detailBody}>
        <ProductTabs product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
