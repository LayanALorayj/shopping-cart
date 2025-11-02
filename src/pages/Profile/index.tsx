import React, { useEffect } from "react";
import { Card, Avatar, Typography, Button, message, Space } from "antd";
import { UserOutlined, MailOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../hooks/useAuthStore";
import styles from "./index.module.css";
import { auth } from "../../Config/firebase";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      message.warning(t("profile.loginFirst"));
      navigate("/login");
    }
  }, [isAuthenticated, navigate, t]);

  if (!isAuthenticated) return null;

  const profileImage = user?.photoURL || user?.image;

  return (
    <div className={styles.profilePage}>
      <Card className={styles.profileCard} bordered={false}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Avatar
            size={120}
            src={profileImage}
            icon={<UserOutlined />}
            className={styles.profileAvatar}
          />

          <Title level={2} style={{ marginTop: "16px" }}>
            {user?.displayName ||
              `${user?.firstName || t("profile.unknown")} ${user?.lastName || ""}`}
          </Title>

          <Text type="secondary" style={{ fontSize: "16px" }}>
            @{user?.username || user?.email?.split("@")[0]}
          </Text>

          <div style={{ marginTop: "16px" }}>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: "8px" }}
            >
              <MailOutlined /> {user?.email || t("profile.noEmail")}
            </Text>
            {user?.gender && (
              <Text type="secondary" style={{ display: "block" }}>
                {t("profile.gender")}: {user.gender}
              </Text>
            )}
          </div>
        </div>

        {/* أزرار My Orders و Logout */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Space direction="vertical" size="middle">
            <Button
              type="default"
              icon={<ShoppingOutlined />}
              size="large"
              onClick={() => navigate("/orders")}
              className={styles.ordersButton}
            >
              My Orders
            </Button>

            <Button
              type="primary"
              danger
              size="large"
              onClick={async () => {
                try {
                  await auth.signOut();
                  logout();
                  message.info(t("profile.loggedOut"));
                  navigate("/login");
                } catch (error) {
                  console.error("Error logging out:", error);
                  message.error("Error logging out!");
                }
              }}
            >
              {t("profile.logout")}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
