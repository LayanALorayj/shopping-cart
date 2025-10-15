import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useCartStore from "../context/useCartStore";
import type { Product } from "../store/useProductStore";
import "../App.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    addItem(product);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleViewDetails} style={{ cursor: "pointer" }}>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.price} $</p>
      <button onClick={handleAddToCart}>
        <ShoppingCartOutlined /> Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
