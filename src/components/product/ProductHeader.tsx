import React from "react";
import { Button, Rate } from "antd";
import { useCartStore } from "../../hooks";
import styles from "./ProductDetailPage.module.css";
import { useTranslation } from "react-i18next";

interface ProductHeaderProps {
  product: any;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  const addItem = useCartStore((state: any) => state.addItem);
  const { t } = useTranslation();
  const handleAddToCart = () => {
  addItem(product);
};


  return (
    <div className={styles.header}>
      <div>
        <div className={styles.brand}>{t('product.brand')}: {product.brand}</div>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.rating}>
          <Rate allowHalf disabled defaultValue={product.rating} />
          <span className={styles.ratingText}>({product.rating}/{t('common.ratingTotal')})</span>
        </div>
      </div>

      <div className={styles.priceSection}>
  {product.discountPercentage ? (
    <>
      <div className={styles.price}>
        ${(
          product.price -
          product.price * (product.discountPercentage / 100)
        ).toFixed(2)}
      </div>
      <div className={styles.originalPrice}>${product.price}</div>
      <div className={styles.discountBadge}>
        {Math.round(product.discountPercentage)}% OFF
      </div>
    </>
  ) : (
    <div className={styles.price}>${product.price}</div>
  )}

  <div
    className={`${styles.stockStatus} ${
      product.stock > 0
        ? styles.stockStatusInStock
        : styles.stockStatusOutOfStock
    }`}
  >
    {product.stock > 0
      ? t("product.inStock", { count: product.stock })
      : t("product.outOfStock")}
  </div>
</div>


      <div className={styles.actions}>
        <Button
          type="primary"
          size="large"
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? t('product.addToCart') : t('product.outOfStock')}
        </Button>
        
      </div>
    </div>
  );
};

export default ProductHeader;
