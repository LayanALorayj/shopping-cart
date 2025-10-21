import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/User";
import { useAuthStore } from "../store/useAuthStore";
import "../App.css";

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const data = await loginUser(values.username!, values.password!);
      console.log("login success");

      setToken(data.accessToken, data);

      console.log("Token saved to store");
      message.success("Logged in successfully!");
      navigate("/profile");

    } catch (error) {
      console.error("❌ Login error:", error);
      message.error("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome</h2>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <div className="remember-section">
            <Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="#">Forgot password?</a>
          </div>

          <Form.Item style={{ marginTop: "20px" }}>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
