import React from "react";
import { Tabs, Rate } from "antd";
import styles from "./ProductDetailPage.module.css";

interface ProductTabsProps {
  product: any;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const items = [
    {
      key: "1",
      label: "Overview",
      children: (
        <div>
          <p>{product.description}</p>
          {product.tags && (
            <div className={styles.tags}>
              {product.tags.map((tag: string, i: number) => (
                <span key={i} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Details",
      children: (
        <ul className={styles.detailsList}>
          <li><strong>Size:</strong> <span>{product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth}</span></li>
          <li><strong>Weight:</strong> <span>{product.weight}kg</span></li>
          <li><strong>SKU:</strong> <span>{product.sku}</span></li>
        </ul>
      ),
    },
    {
      key: "3",
      label: "Reviews",
      children: (
        <div className={styles.tabContent}>
          {product.reviews?.length > 0 ? (
            product.reviews.map((r: any, i: number) => (
              <div key={i} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewRating}>
                    <Rate disabled defaultValue={r.rating} />
                  </div>
                  <div className={styles.reviewMeta}>
                    {r.reviewerName} – {r.date}
                  </div>
                </div>
                <p className={styles.reviewComment}>{r.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} className={styles.tabs} />;
};

export default ProductTabs;
