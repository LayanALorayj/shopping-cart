import React from "react";
import { Button, Rate } from "antd";
import useCartStore from "../../context/useCartStore";

interface ProductHeaderProps {
  product: any;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-header">
      <div>
        <h1 className="product-title">{product.title}</h1>
        <p className="product-brand">Brand: {product.brand}</p>
        <Rate allowHalf disabled defaultValue={product.rating} />
        <p className="product-price">${product.price}</p>
      </div>

      <Button
        type="primary"
        size="large"
        className="add-to-cart-btn"
        onClick={() => addItem(product)}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductHeader;
