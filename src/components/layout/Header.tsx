import React, { useState } from "react";
import { Layout, Badge, Button } from "antd";
import { Link } from "react-router-dom";
import {ShoppingCartOutlined, HomeFilled, FileTextFilled,MenuOutlined,} from "@ant-design/icons";
import useCartStore from "../../context/useCartStore";
import logo from "../../assets/logoL.png";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const count = useCartStore((state) => state.count);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <AntHeader className="custom-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Shop Logo" className="logo-image" />
          <span className="shop-name">Layan Shop</span>
        </Link>

        <nav className="nav-links nav-desktop">
          <Link to="/" className="nav-item">
            <HomeFilled className="nav-icon" /> Home
          </Link>
          </nav>
           <nav className="nav-links nav-desktop">
          <Link to="/contact" className="nav-item">
            <FileTextFilled className="nav-icon" /> Contact Us
          </Link>
          </nav>

        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleMenu}
          className="menu-button"
        />
      </div>

      <Link to="/cart" className="cart-link">
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

      {menuOpen && (
        <div className="dropdown-menu">
          <Link to="/" className="dropdown-item" onClick={() => setMenuOpen(false)}>
            <HomeFilled className="nav-icon" /> Home
          </Link>
          <Link to="/contact" className="dropdown-item" onClick={() => setMenuOpen(false)}>
            <FileTextFilled className="nav-icon" /> Contact Us
          </Link>
        </div>
      )}
    </AntHeader>
  );
};

export default Header;
