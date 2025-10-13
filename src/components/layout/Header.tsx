import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { ShoppingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import useCartStore from "../../context/useCartStore";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const count = useCartStore((state) => state.count);

  return (
    <AntHeader className="custom-header">
      <Link to="/" className="shop-title">
        <ShoppingOutlined className="shop-icon" />
        Shop
      </Link>

      <Link to="/cart" className="cart-link">
        <div className="cart-icon-container">
          <ShoppingCartOutlined />
          <span>{count}</span>
        </div>
      </Link>
    </AntHeader>
  );
};

export default Header;
