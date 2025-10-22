import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, HeartTwoTone } from "@ant-design/icons";
import useCartStore from "../hooks/useCartStore";
import styles from "./CartPage.module.css";

const CartPage: React.FC = () => {
  const { cartList, removeItem, loadCartFromStorage } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadCartFromStorage();
  }, [loadCartFromStorage]);

  const totalPrice = cartList.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Cart</h2>

      {cartList.length === 0 ? (
        <div className={styles.emptyMessage}>
          Your cart is empty <HeartTwoTone twoToneColor="#1890ff" /> !
        </div>
      ) : (
        <>
          <div className={styles.productsContainer}>
            {cartList.map((item) => (
              <div key={item.id} className={styles.productCard}>
                <img src={item.product.thumbnail} alt={item.product.title} />
                <h3>{item.product.title}</h3>
                <p>${item.product.price} x {item.quantity}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className={styles.removeButton}
                >
                  <DeleteOutlined />
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Items ({cartList.length})</span>
              <span className={styles.summaryValue}>{cartList.length}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total</span>
              <span className={styles.summaryValue}>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}

      <button onClick={() => navigate("/")} className={styles.continueButton}>
        Continue Shopping
      </button>
    </div>
  );
};

export default CartPage;
