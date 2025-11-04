import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { auth } from "../Config/firebase";
import "../App.css";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;

      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [db]);

  if (loading) return <div className="orders-loading">Loading your orders...</div>;
  if (orders.length === 0)
    return <div className="orders-empty">You have no orders yet.</div>;

  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return "Unknown";

    const date = timestamp.toDate();
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="orders-card">
          <div className="orders-items">
            {order.items.map((item: any) => (
              <div key={item.id} className="orders-item">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="orders-item-image"
                />
                <div className="orders-item-info">
                  <h4>{item.name}</h4>
                  <p>
                    ${item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="orders-summary">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Total:</strong> ${order.total?.toFixed(2)}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
