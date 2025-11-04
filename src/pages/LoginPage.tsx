import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GoogleOutlined } from "@ant-design/icons";
import useAuthStore from "../hooks/useAuthStore";
import { firebaseAuthService } from "../Config/authService";
import "../App.css";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mapFirebaseUserToStoreUser = (
    firebaseUser: import("firebase/auth").User
  ) => ({
    id: Number(firebaseUser.uid.substring(0, 8)),
    username: firebaseUser.email || "",
    email: firebaseUser.email || "",
    firstName: firebaseUser.displayName?.split(" ")[0] || "",
    lastName: firebaseUser.displayName?.split(" ")[1] || "",
    gender: "",
    image: firebaseUser.photoURL || "",
    displayName: firebaseUser.displayName || "",
    photoURL: firebaseUser.photoURL || "",
  });

  const handleLoginWithEmail = async (values: any) => {
    setErrorMessage("");
    setLoading(true);
    try {
      const result = await firebaseAuthService.loginWithEmail(
        values.email,
        values.password
      );
      const token = await result.user.getIdToken();
      const user = mapFirebaseUserToStoreUser(result.user);

      login(user, { accessToken: token, refreshToken: token });
      navigate("/profile");
    } catch (err: any) {
      console.error("Firebase login error:", err);

      const code = err.code || err.message || "";

      if (code.includes("invalid-email")) {
        setErrorMessage(t("login.invalidEmail"));
      } else if (code.includes("user-not-found")) {
        setErrorMessage(t("login.userNotFound"));
      } else if (code.includes("wrong-password")) {
        setErrorMessage(t("login.wrongPassword"));
      } else if (code.includes("too-many-requests")) {
        setErrorMessage(t("login.tooManyRequests"));
      } else {
        setErrorMessage(t("login.firebaseError"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(""); 
    try {
      const result = await firebaseAuthService.loginWithGoogle();
      const token = await result.user.getIdToken();
      const user = mapFirebaseUserToStoreUser(result.user);

      login(user, { accessToken: token, refreshToken: token });
      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(t("login.googleError"));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">{t("login.welcome")}</h2>

        {errorMessage && (
          <div
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "10px",
              fontSize: "14px",
              background: "#ffe6e6",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            {errorMessage}
          </div>
        )}

        <Form
          name="login"
          layout="vertical"
          onFinish={handleLoginWithEmail}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label={t("login.email")}
            rules={[{ required: true, message: t("login.enterEmail") }]}
          >
            <Input placeholder={t("login.enterEmail")} />
          </Form.Item>

          <Form.Item
            name="password"
            label={t("login.password")}
            rules={[{ required: true, message: t("login.enterPassword") }]}
          >
            <Input.Password placeholder={t("login.enterPassword")} />
          </Form.Item>

          <div className="remember-section">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t("login.remember")}</Checkbox>
            </Form.Item>
            <a href="#">{t("login.forgot")}</a>
          </div>

          <Form.Item style={{ marginTop: 20 }}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t("login.login")}
            </Button>
          </Form.Item>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              icon={<GoogleOutlined />}
              onClick={handleGoogleLogin}
              block
              style={{ marginTop: 10 }}
            >
              {t("login.loginWithGoogle")}
            </Button>
          </Space>

          <div className="login-footer" style={{ marginTop: "15px" }}>
            <span>{t("login.noAccount")} </span>
            <a onClick={() => navigate("/register")}>
              {t("login.createAccount")}
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
