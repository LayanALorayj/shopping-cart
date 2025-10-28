import React from "react";
import { Form, Input, Button, Checkbox, message, Space } from "antd";
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

  const mapFirebaseUserToStoreUser = (firebaseUser: import("firebase/auth").User) => ({
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
    try {
      const result = await firebaseAuthService.loginWithEmail(values.email, values.password);
      const token = await result.user.getIdToken();
      const user = mapFirebaseUserToStoreUser(result.user);

      login(user, { accessToken: token, refreshToken: token });
      message.success(t("login.success"));
      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      message.error(t("login.invalid"));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await firebaseAuthService.loginWithGoogle();
      console.log("Google user:", result.user);
      const token = await result.user.getIdToken();
      const user = mapFirebaseUserToStoreUser(result.user);

      login(user, { accessToken: token, refreshToken: token });
      message.success("Logged in with Google");
      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      message.error("Google login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">{t("login.welcome")}</h2>

        <Form
          name="login"
          layout="vertical"
          onFinish={handleLoginWithEmail}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            name="Email"
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
            <Button type="primary" htmlType="submit" block>
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
        </Form>
      </div>
    </div>
  );
};

export default Login;
