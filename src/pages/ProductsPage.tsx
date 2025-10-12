import React from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

const ProductsPage: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p className="loading">⏳ Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="products-container">
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
