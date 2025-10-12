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

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const newItem = { name, price, image };
    cartItems.push(newItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    addToCart(); 
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price} $</p>
      <button onClick={handleAddToCart}>
        <ShoppingCartOutlined /> Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
