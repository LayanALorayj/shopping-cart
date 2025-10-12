import React from "react";
import { ShoppingOutlined, ShoppingCartOutlined } from "@ant-design/icons";   
import { useCart } from "../../context/CartContext";
import "../../App.css";

const Header: React.FC = () => {
  const { state } = useCart();

  return (
    <header>
      <h2 className="shop-title">
        <ShoppingOutlined style={{ marginRight: "8px" }} />
        Shop
      </h2>
      <div className="cart-icon">
        <ShoppingCartOutlined style={{ fontSize: "22px", marginRight: "5px" }} />
        <span>{state.count}</span>
      </div>
    </header>
  );
};

export default Header;
