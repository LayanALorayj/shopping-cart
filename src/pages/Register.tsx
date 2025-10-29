import { useState } from "react";
import { Form, Input, Button, Typography, Card, message, Space } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuthService } from "../Config/authService";
import { auth } from "../Config/firebase";
import { addUserToFirestore } from "../Config/firestoreService";
import "../App.css";

const { Title, Text } = Typography;

const Register = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // إنشاء المستخدم في Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      // تحديث الاسم في الحساب
      await updateProfile(user, { displayName: values.username });

      // حفظ المستخدم في Firestore
      await addUserToFirestore(user.uid, {
        username: values.username,
        email: values.email,
        photoURL: user.photoURL || "",
        createdAt: new Date().toISOString(),
        role: "customer",
      });

      message.success(t("register.success"));
      navigate("/profile");
    } catch (error: any) {
      console.error(error);
      message.error(t("register.failed"));
    } finally {
      setLoading(false);
    }
  };

  // تسجيل بحساب Google
  const handleGoogleRegister = async () => {
    try {
      const result = await firebaseAuthService.loginWithGoogle();
      const user = result.user;

      await addUserToFirestore(user.uid, {
        username: user.displayName || "New User",
        email: user.email,
        photoURL: user.photoURL || "",
        createdAt: new Date().toISOString(),
        role: "customer",
      });

      message.success(t("register.googleSuccess"));
      navigate("/profile");
    } catch (error) {
      console.error(error);
      message.error(t("register.googleFailed"));
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card" bordered={false}>
        <Title level={2} className="register-title">
          {t("register.title")}
        </Title>
        <Text className="register-subtitle">{t("register.subtitle")}</Text>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          className="register-form"
        >
          <Form.Item
            name="username"
            label={t("register.username")}
            rules={[{ required: true, message: t("register.usernameError") }]}
          >
            <Input prefix={<UserOutlined />} placeholder={t("register.username")} />
          </Form.Item>

          <Form.Item
            name="email"
            label={t("register.email")}
            rules={[
              { required: true, message: t("register.emailError") },
              { type: "email", message: t("register.emailInvalid") },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label={t("register.password")}
            rules={[{ required: true, message: t("register.passwordError") }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="********" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={t("register.confirmPassword")}
            dependencies={["password"]}
            rules={[
              { required: true, message: t("register.confirmError") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("register.passwordMismatch")));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("register.confirmPassword")}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="register-btn"
          >
            {t("register.submit")}
          </Button>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              icon={<GoogleOutlined />}
              onClick={handleGoogleRegister}
              block
              style={{ marginTop: 10 }}
            >
              {t("register.google")}
            </Button>
          </Space>
        </Form>

        <div className="register-footer">
          <Text>{t("register.haveAccount")} </Text>
          <a href="/login">{t("register.login")}</a>
        </div>
      </Card>
    </div>
  );
};

export default Register;
