import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, message, Card, Rate } from "antd";
import { ref, push, set } from "firebase/database";
import { realtimeDB } from "../Config/firebase";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import { auth, getUserFromFirestore } from "../Config/firebase"; 

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!isAuthenticated || !user) {
        message.warning("You must be logged in as admin to add products.");
        navigate("/login");
        return;
      }

      const userData = await getUserFromFirestore(user.uid);
      if (userData && userData.role === "admin") {
        setIsAdmin(true);
      } else {
        message.error("You are not authorized to add products.");
        navigate("/");
      }
    };

    checkAdmin();
  }, [isAuthenticated, navigate]);

  if (!isAdmin) return null; 

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const newProductRef = push(ref(realtimeDB, "newProducts"));
      await set(newProductRef, {
        name: values.name,
        brand: values.brand,
        price: values.price,
        image: values.image || "",
        rating: values.rating || 0,
        createdAt: new Date().toISOString(),
      });

      message.success("Product added successfully!");
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Error adding product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Add New Product</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please enter the brand name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Image URL (optional)" name="image">
          <Input placeholder="Enter image URL if available" />
        </Form.Item>

        <Form.Item label="Rating (optional)" name="rating">
            <Rate allowHalf defaultValue={0} />
            </Form.Item>
            <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </Form>
    </Card>
  );
};

export default AddProduct;