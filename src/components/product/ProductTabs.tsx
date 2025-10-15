import React from "react";
import { Tabs, Rate } from "antd";

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
            <div className="tags">
              {product.tags.map((tag: string, i: number) => (
                <span key={i} className="tag">
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
        <ul className="details-list">
          <li>Size: {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth}</li>
          <li>Weight: {product.weight}kg</li>
          <li>SKU: {product.sku}</li>
        </ul>
      ),
    },
    {
      key: "3",
      label: "Reviews",
      children: (
        <div className="reviews">
          {product.reviews?.length > 0 ? (
            product.reviews.map((r: any, i: number) => (
              <div key={i} className="review-card">
                <Rate disabled defaultValue={r.rating} />
                <p className="review-comment">{r.comment}</p>
                <small className="review-meta">
                  {r.reviewerName} – {r.date}
                </small>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} className="product-tabs" />;
};

export default ProductTabs;
