import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, HeartTwoTone } from "@ant-design/icons";
import useCartStore from "../hooks/useCartStore";
import { useTranslation } from "react-i18next";
import styles from "./CartPage.module.css";

const CartPage: React.FC = () => {
  const { cartList, removeItem, loadCartFromStorage } = useCartStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    loadCartFromStorage();
  }, [loadCartFromStorage]);

  const totalPrice = cartList.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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
                  ${item.product.price} x {item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className={styles.removeButton}
                >
                  <DeleteOutlined />
                  {t("cartPage.remove")}
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

      <button
        onClick={() => navigate("/")}
        className={styles.continueButton}
      >
        {t("cartPage.continueShopping")}
      </button>
    </div>
  );
};

export default CartPage;
