import React, { useState } from "react";
import { Layout, Badge, Button } from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  HomeFilled,
  FileTextFilled,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useCartStore from "../../context/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import logo from "../../assets/logoL.png";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const count = useCartStore((state) => state.count);
  const { accessToken } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <AntHeader className="custom-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Shop Logo" className="logo-image" />
          <span className="shop-name">Layan Shop</span>
        </Link>
      </div>

      <nav className="nav-center nav-desktop">
        <div className="nav-circle">
          <Link to="/" className="nav-item">
            <HomeFilled className="nav-icon" /> Home
          </Link>
        </div>
        <div className="nav-circle">
          <Link to="/contact" className="nav-item">
            <FileTextFilled className="nav-icon" /> Contact Us
          </Link>
        </div>
      </nav>

      <div className="header-right">
        <Link to="/cart" className="cart-link cart-desktop">
          <Badge
            count={count}
            size="default"
            style={{
              backgroundColor: "#ff69b4",
              boxShadow: "0 0 6px rgba(255, 105, 180, 0.6)",
              fontSize: "13px",
              minWidth: "22px",
              height: "22px",
              lineHeight: "22px",
            }}
          >
            <div className="cart-icon-container">
              <ShoppingCartOutlined />
            </div>
          </Badge>
        </Link>

        <Link to={accessToken ? "/profile" : "/login"} className="profile-link">
          <UserOutlined className="profile-icon" />
        </Link>

        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleMenu}
          className="menu-button"
        />
      </div>

      {menuOpen && (
        <div className="dropdown-menu">
          <Link to="/" className="dropdown-item" onClick={() => setMenuOpen(false)}>
            <HomeFilled className="nav-icon" /> Home
          </Link>
          <Link to="/contact" className="dropdown-item" onClick={() => setMenuOpen(false)}>
            <FileTextFilled className="nav-icon" /> Contact Us
          </Link>
          <Link to="/cart" className="dropdown-item" onClick={() => setMenuOpen(false)}>
            <ShoppingCartOutlined className="nav-icon" /> Cart ({count})
          </Link>

          <Link
            to={accessToken ? "/profile" : "/login"}
            className="dropdown-item"
            onClick={() => setMenuOpen(false)}
          >
            <UserOutlined className="nav-icon" /> {accessToken ? "Profile" : "Login"}
          </Link>
        </div>
      )}
    </AntHeader>
  );
};

export default Header;
