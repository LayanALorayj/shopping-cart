import React, { useState } from "react";
import { Row, Col, Spin, Empty } from "antd";
import { useTranslation } from "react-i18next";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/product/ProductCard";
import { useSearchProducts } from "../hooks/useSearchProducts";

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const { products, loading, deferredQuery } = useSearchProducts(query);

  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <h2 style={{ marginBottom: 24 }}>{t("search.searchProducts")}</h2>

      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <SearchBar value={query} onChange={setQuery} placeholder={t("search.placeholder")} />
      </div>

      {loading && <Spin size="large" style={{ marginTop: 40 }} />}

      {!loading &&
        (deferredQuery && products.length > 0 ? (
          <Row gutter={[16, 16]} justify="center" style={{ marginTop: 24 }}>
            {products.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          deferredQuery &&
          products.length === 0 && <Empty description={t("search.noResults")} style={{ marginTop: 40 }} />
        ))}
    </div>
  );
};

export default SearchPage;
