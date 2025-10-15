import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, HeartTwoTone } from "@ant-design/icons";
import useCartStore from "../context/useCartStore";
import "../App.css";

const CartPage: React.FC = () => {
  const { cartList, removeItem, loadCartFromStorage } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadCartFromStorage();
  }, [loadCartFromStorage]);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartList.length === 0 ? (
        <p>
          Your cart is empty <HeartTwoTone twoToneColor="#934f74ff" /> !
        </p>
      ) : (
        <div className="cart-products-container">
          {cartList.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.thumbnail} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.price} $</p>
              <button
                onClick={() => removeItem(item.id)}
                className="remove-button"
              >
                <DeleteOutlined style={{ marginRight: "6px" }} />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate("/")} className="back-home-button">
        Continue Shopping
      </button>
    </div>
  );
};

export default CartPage;
