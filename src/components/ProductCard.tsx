import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons"; 
import { useCart } from "../context/CartContext";
import "../App.css";

interface ProductProps {
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductProps> = ({ name, price, image }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price} $</p>
      <button onClick={addToCart}>
        <ShoppingCartOutlined /> Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
