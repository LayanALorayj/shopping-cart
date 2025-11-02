import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, HeartTwoTone } from "@ant-design/icons";
import { message } from "antd";
import useCartStore from "../hooks/useCartStore";
import { useCheckout } from "../hooks/useCheckout";
import { useTranslation } from "react-i18next";
import { auth } from "../Config/firebase";
import styles from "./CartPage.module.css";

const CartPage: React.FC = () => {
  const { cartList, removeItem, loadCartFromStorage } = useCartStore();
  const { checkout } = useCheckout();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isOrderTabVisible, setIsOrderTabVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadCartFromStorage();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, [loadCartFromStorage]);

  const totalPrice = cartList.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cartList.length === 0) return message.warning("Your cart is empty!");

    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        setIsOrderTabVisible(true);
        message.info("Please log in to complete your order.");
        return;
      }

      const success = await checkout(user.uid);

      if (success) {
        message.success("Order submitted successfully!");
        setIsOrderTabVisible(true);
      } else {
        message.error("Failed to submit order.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("cartPage.title")}</h2>

      {cartList.length === 0 ? (
        <div className={styles.emptyMessage}>
          {t("cartPage.empty")} <HeartTwoTone twoToneColor="#bc6789" />
        </div>
      ) : (
        <>
          <div className={styles.productsContainer}>
            {cartList.map((item) => (
              <div key={item.id} className={styles.productCard}>
                <img src={item.product.thumbnail} alt={item.product.title} />
                <h3>{item.product.title}</h3>
                <p>
                  ${item.product.price} × {item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className={styles.removeButton}
                >
                  <DeleteOutlined /> {t("cartPage.remove")}
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h3 className={styles.summaryTitle}>{t("cartPage.orderSummary")}</h3>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>
                {t("cartPage.items")} ({cartList.length})
              </span>
              <span className={styles.summaryValue}>{cartList.length}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t("cartPage.total")}</span>
              <span className={styles.summaryValue}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}

      <div className={styles.buttonGroup}>
        <button onClick={() => navigate("/")} className={styles.continueButton}>
          Continue Shopping
        </button>

        {cartList.length > 0 && (
          <button
            onClick={handleCheckout}
            className={styles.checkoutButton}
            disabled={loading}
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
        )}
      </div>

      {isOrderTabVisible && (
        <div className={styles.orderTab}>
          {isLoggedIn ? (
            <>
              <h3>Order Submitted Successfully 🎉</h3>
              <p>Your order has been placed and saved to Firestore.</p>
              <div className={styles.orderTabButtons}>
                <button onClick={() => setIsOrderTabVisible(false)}>Close</button>
                <button onClick={() => navigate("/orders")}>See Orders</button>
              </div>
            </>
          ) : (
            <>
              <h3>To complete your order, please log in.</h3>
              <div className={styles.orderTabButtons}>
                <button onClick={() => setIsOrderTabVisible(false)}>Close</button>
                <button onClick={() => navigate("/login")}>Log In</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
