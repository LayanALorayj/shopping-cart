import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { userService } from "../services";
import useAuthStore from "../hooks/useAuthStore";
import "../App.css";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onFinish = async (values: any) => {
    try {
      const data = await userService.login({ username: values.username, password: values.password });
      login(data, { accessToken: data.token, refreshToken: data.token });
      message.success(t("login.success"));
      navigate("/profile");
    } catch (error) {
      message.error(t("login.invalid"));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">{t("login.welcome")}</h2>
        <Form name="login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
          <Form.Item name="username" label={t("login.username")} rules={[{ required: true, message: t("login.enterUsername") }]}>
            <Input placeholder={t("login.enterUsername")} />
          </Form.Item>

          <Form.Item name="password" label={t("login.password")} rules={[{ required: true, message: t("login.enterPassword") }]}>
            <Input.Password placeholder={t("login.enterPassword")} />
          </Form.Item>

          <div className="remember-section">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t("login.remember")}</Checkbox>
            </Form.Item>
            <a href="#">{t("login.forgot")}</a>
          </div>

          <Form.Item style={{ marginTop: "20px" }}>
            <Button type="primary" htmlType="submit" block>
              {t("login.login")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
