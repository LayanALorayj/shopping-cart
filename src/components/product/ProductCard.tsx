import React, { useState } from "react";
import { 
  ShoppingCartOutlined, 
  EyeOutlined, 
  HeartOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  Button, 
  Badge, 
  Tooltip, 
  Rate, 
  Tag, 
  Space, 
  Typography, 
  Image
} from "antd";
// import useCartStore from "../../hooks/useCartStore";
import type { Product } from "../../types/product";
import "./ProductCard.css";
import { useCartStore } from "../../hooks";

const { Text, Title } = Typography;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      addItem(product);
      setIsLoading(false);
    }, 300);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick view functionality can be implemented here
    console.log("Quick view:", product.title);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Wishlist functionality can be implemented here
    console.log("Added to wishlist:", product.title);
  };

  const discountPrice = product.discountPercentage 
    ? product.price - (product.price * product.discountPercentage / 100)
    : product.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Card
      hoverable
      className="product-card"
      cover={
        <div className="product-image-container">
          <Image
            src={product.thumbnail}
            alt={product.title}
            preview={false}
            className="product-image"
            loading="lazy"
            onClick={handleViewDetails}
          />
          
         

          {/* Stock Status */}
          <Tag
            color={product.stock > 0 ? 'success' : 'error'}
            className="stock-status"
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2
            }}
          >
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </Tag>


        </div>
      }
      actions={[
        <Button
          key="add-to-cart"
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          loading={isLoading}
          disabled={product.stock === 0}
          block
          className="add-to-cart-btn"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      ]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Meta
        title={
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {/* Brand */}
            <Tag color="blue" className="product-brand">
              {product.brand}
            </Tag>
            
            {/* Title */}
            <Title 
              level={5} 
              className="product-title"
              onClick={handleViewDetails}
              style={{ 
                margin: 0, 
                cursor: 'pointer',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '2.4em'
              }}
            >
              {product.title}
            </Title>

            {/* Rating */}
            <Space align="center" size="small">
              <Rate 
                disabled 
                defaultValue={Math.round(product.rating)} 
                style={{ fontSize: '12px' }}
              />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                ({product.rating})
              </Text>
            </Space>

            {/* Price */}
            <Space align="baseline" size="small">
              <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                {formatPrice(discountPrice)}
              </Text>
              {product.discountPercentage > 0 && (
                <Text delete type="secondary" style={{ fontSize: '14px' }}>
                  {formatPrice(product.price)}
                </Text>
              )}
            </Space>
          </Space>
        }
      />
    </Card>
  );
};

export default ProductCard;
