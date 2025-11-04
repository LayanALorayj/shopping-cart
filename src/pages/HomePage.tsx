import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logEvent } from "firebase/analytics";
import { analytics, getUserFromFirestore, auth } from "../Config/firebase";
import "../App.css";
import { Button } from "antd";
import useAuthStore from "../hooks/useAuthStore";

const HomePage: React.FC = () => {
  const { categories, loading, error } = useProducts();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user: storeUser, isAuthenticated } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const categoryImages: Record<string, string> = {
    beauty:"https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg",

    "womens-bags":"https://s.alicdn.com/@sc04/kf/H5754f826ef344ce58dc855d7bf4a9aecF.jpg",

    "womens-dresses":"https://i.pinimg.com/736x/73/64/7a/73647a7fe10bcf088ca2982496b17fc5.jpg",

    "womens-jewellery":"https://endlessandco.com.au/cdn/shop/articles/20230826_215053_1100x.jpg?v=1699921667",

    "womens-shoes":"https://bravomoda.eu/5579/white-wedding-shoes-with-glittery-stiletto-heels.jpg",

    "womens-watches":"https://sc04.alicdn.com/kf/Ha887eab344304fd9a99572a9dab1166ec.jpg",
  };

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "home_page_viewed");
    }

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && isAuthenticated) {
        const userData = await getUserFromFirestore(user.uid);
        const role = userData?.role || storeUser?.role;
        setIsAdmin(role === "admin");
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated, storeUser]);

  const handleCategoryClick = (slug: string) => {
    if (analytics) {
      logEvent(analytics, "category_clicked", { category_slug: slug });
    }
    navigate(`/products/${slug}`);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  if (authLoading)
    return <div className="hp-loading">Loading authentication...</div>;
  if (loading) return <div className="hp-loading">Loading categories...</div>;
  if (error) return <div className="hp-error">Error: {error}</div>;

  return (
    <div className="home-page">
      <h1 className="hp-title">{t("homepage.title")}</h1>

      {isAdmin && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button type="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>
      )}

      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug)}
            className="category-card"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCategoryClick(cat.slug);
            }}
          >
            <div
              className="category-bg"
              style={{
                backgroundImage: `url(${
                  categoryImages[cat.slug] || "https://via.placeholder.com/400"
                })`,
              }}
            ></div>

            <div className="category-content">
              <h3 className="category-name">{t(`categories.${cat.slug}`)}</h3>
            </div>
          </div>
        ))}

        <div
          onClick={() => handleCategoryClick("newProducts")}
          className="category-card"
          role="button"
          tabIndex={0}
        >
          <div
            className="category-bg"
            style={{
              backgroundImage:
                'url("https://www.publicdomainpictures.net/pictures/210000/nahled/new-label-overlay.jpg")',
            }}
          ></div>

          <div className="category-content">
            <h3 className="category-name">New Product</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
