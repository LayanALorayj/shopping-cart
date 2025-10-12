import React from "react";
import { Layout } from 'antd'; 
import { Link } from "react-router-dom";
import { ShoppingOutlined, ShoppingCartOutlined } from "@ant-design/icons"; 
import { useCart } from "../../context/CartContext";

const { Header: AntHeader } = Layout; 

const customAntHeaderStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #cda0b2, #bc6789)', 
  color: 'white',
  height: 64, 
  padding: '1rem 2.5rem',
  display: 'flex',
  justifyContent: 'space-between', 
  alignItems: 'center',
  lineHeight: 'normal', 
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
  position: 'sticky',
  top: 0,
  zIndex: 10,
};

const shopTitleStyles: React.CSSProperties = {
  fontSize: '1.6rem',
  letterSpacing: '1px',
  fontWeight: 600,
  margin: 0, 
  display: 'flex',
  alignItems: 'center',
};

const cartIconContainerStyles: React.CSSProperties = {
  fontSize: '1.2rem',
  background: 'rgba(255, 255, 255, 0.2)', 
  padding: '6px 14px',
  borderRadius: '20px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: 'white',
  cursor: 'pointer', 
  textDecoration: 'none' 
};

const Header: React.FC = () => {
  const { state } = useCart();

  return (
    <AntHeader style={customAntHeaderStyle}>
      <h2 style={shopTitleStyles}>
        <ShoppingOutlined style={{ marginRight: "8px" }} />
        Shop
      </h2>

      <Link to="/cart" style={{ textDecoration: "none" }}>
        <div style={cartIconContainerStyles}>
          <ShoppingCartOutlined />
          <span>{state.count}</span>
        </div>
      </Link>
    </AntHeader>
  );
};

export default Header;
