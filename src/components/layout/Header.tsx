import React, { useState } from "react";
import { Layout, Badge, Button } from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  PhoneFilled,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useAuthStore from "../../hooks/useAuthStore";
import useCartStore from "../../hooks/useCartStore";
import logo from "../../assets/logoL.png";
import LanguageToggle from "../LanguageToggle";
import { useTranslation } from "react-i18next";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const cartList = useCartStore((state) => state.cartList);
  const count = cartList.reduce((total, item) => total + item.quantity, 0);
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
            <Link to="/search" className="nav-item">
             <SearchOutlined className="nav-icon" /> {t("header.search") || "Search"}
          </Link>
        </div>
        <div className="nav-circle">
          <Link to="/contact" className="nav-item">
            <PhoneFilled className="nav-icon" /> {t("header.contact")}
          </Link>
        </div>
      </nav>

      <div className="header-right">
        <LanguageToggle />
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
          <Link  to="/search" className="dropdown-item" onClick={() => setMenuOpen(false)}>
             <SearchOutlined className="nav-icon" /> {t("header.search") || "Search"}
          </Link>
          <Link to="/contact" className="dropdown-item" onClick={() => setMenuOpen(false)}>
            <PhoneFilled className="nav-icon" /> {t("header.contact")}
          </Link>
          <Link to="/cart" className="dropdown-item" onClick={() => setMenuOpen(false)}>
            <ShoppingCartOutlined className="nav-icon" /> {t("header.cart")} ({count})
          </Link>
          <Link
            to={accessToken ? "/profile" : "/login"}
            className="dropdown-item"
            onClick={() => setMenuOpen(false)}
          >
            <UserOutlined className="nav-icon" /> {t(accessToken ? "header.profile" : "header.login")}
          </Link>
        </div>
      )}
    </AntHeader>
  );
};

export default Header;
