import React, { useState } from "react";
import styles from "./ProductDetailPage.module.css";

interface ProductImagesProps {
  images: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className={styles.imagesContainer}>
      <div className={styles.mainImageContainer}>
        <img src={mainImage} alt="Main" className={styles.mainImage} />
      </div>
      <div className={styles.thumbnailList}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Thumbnail ${i}`}
            className={`${styles.thumbnail} ${img === mainImage ? styles.thumbnailActive : ""}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
