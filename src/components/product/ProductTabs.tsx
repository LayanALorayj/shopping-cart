import React from "react";
import { Tabs, Rate } from "antd";
import styles from "./ProductDetailPage.module.css";
import { useTranslation } from "react-i18next"; 

interface ProductTabsProps {
  product: any;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const { t } = useTranslation(); 
  
  const items = [
    {
      key: "1",
      label: t('tabs.overview'), 
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
      label: t('tabs.details'), 
      children: (
        <ul className={styles.detailsList}>
          <li><strong>{t('details.size')}:</strong> <span>{product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth}</span></li>
          <li><strong>{t('details.weight')}:</strong> <span>{product.weight}{t('details.weightUnit')}</span></li> {/* kg تصبح كجم */}
          <li><strong>{t('details.sku')}:</strong> <span>{product.sku}</span></li>
        </ul>
      ),
    },
    {
      key: "3",
      label: t('tabs.reviews'), 
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
            <p>{t('reviews.noReviews')}</p> 
          )}
        </div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} className={styles.tabs} />;
};

export default ProductTabs;