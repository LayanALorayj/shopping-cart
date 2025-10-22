import React from "react";
import { Button, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../hooks";
import styles from "./ProductDetailPage.module.css";

interface ProductHeaderProps {
  product: any;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  const addItem = useCartStore((state: any) => state.addItem);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addItem({ id: product.id, product: product, quantity: 1 });
    navigate('/cart');
  };

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.brand}>Brand: {product.brand}</div>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.rating}>
          <Rate allowHalf disabled defaultValue={product.rating} />
          <span className={styles.ratingText}>({product.rating}/5)</span>
        </div>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.price}>${product.price}</div>
        {product.originalPrice && product.originalPrice > product.price && (
          <div className={styles.originalPrice}>${product.originalPrice}</div>
        )}
        {product.discount && (
          <div className={styles.discountBadge}>
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        <div className={`${styles.stockStatus} ${product.stock > 0 ? styles.stockStatusInStock : styles.stockStatusOutOfStock}`}>
          {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
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
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        
      </div>
    </div>
  );
};

export default ProductHeader;
