import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../Config/firebase";
import useCartStore from "../hooks/useCartStore";

const db = getFirestore(app);

export const useCheckout = () => {
  const { cartList, clearCart } = useCartStore();

  const checkout = async (userId: string) => {
    if (cartList.length === 0) {
      console.warn("Cart is empty, nothing to checkout.");
      return false;
    }

    try {
      const orderData = {
        userId,
        items: cartList.map((item) => ({
          id: item.product.id,
          name: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          thumbnail: item.product.thumbnail,
        })),
        total: cartList.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
        status: "submitted",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);
      clearCart(); 
      return true;
    } catch (error) {
      console.error("Error submitting order:", error);
      return false;
    }
  };

  return { checkout };
};
