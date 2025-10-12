import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // 👈 استدعاء الكونتكست
import { useNavigate } from "react-router-dom"; // ✅ استدعاء useNavigate
import { DeleteOutlined } from "@ant-design/icons";
import { HeartTwoTone  } from '@ant-design/icons';
import "../App.css";

interface CartItem {
  name: string;
  price: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { updateCountFromStorage } = useCart(); // 👈
  const navigate = useNavigate(); // ✅ التوجيه

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedItems);
  }, []);

  const handleRemoveItem = (indexToRemove: number) => {
    const updatedItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    updateCountFromStorage(); 
  };

  return (
    <div className="cart-container">
      <h2>Your Cart  </h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty  <HeartTwoTone twoToneColor="#934f74ff" /> ! </p>
      ) : (
        <div className="products-container">
          {cartItems.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price} $</p>
              <button
                onClick={() => handleRemoveItem(index)}
                style={{
                  marginTop: "10px",
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <DeleteOutlined style={{ marginRight: "6px" }} />
                    Remove
              </button>
            </div>
          ))}
        </div>
      )}

      
      <button
        onClick={() => navigate("/")}
        className="back-home-button"
      >
       Continue Shopping 
      </button>
    </div>
  );
};

export default CartPage;
