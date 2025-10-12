import React from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { ClockCircleTwoTone} from "@ant-design/icons";

const ProductsPage: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) return
   <p className="loading"><ClockCircleTwoTone 
  twoToneColor="#bc6789" 
  style={{ fontSize: '36px', marginRight: '10px' }} 
/>
 Loading... </p>;
  if (error) return <p className="error">{error}</p>;

  return (
   <div className="products-container custom-grid-layout">
  {products.map((p) => (
    <ProductCard
      key={p.id}
      name={p.title}
      price={p.price}
      image={p.thumbnail}
    />
  ))}
</div>
  );
};

export default ProductsPage;
