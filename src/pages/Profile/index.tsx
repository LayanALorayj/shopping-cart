import React, { useEffect } from "react";
import { Card, Avatar, Typography, Button, message } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../hooks/useAuthStore";
import styles from "./index.module.css";

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

  return (
    <div className={styles.profilePage}>
      <Card className={styles.profileCard} bordered={false}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Avatar size={120} src={user?.image} icon={<UserOutlined />} className={styles.profileAvatar} />
          <Title level={2} style={{ marginTop: '16px' }}>{user?.firstName || t("profile.unknown")} {user?.lastName || ""}</Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>@{user?.username}</Text>
          <div style={{ marginTop: '16px' }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}><MailOutlined /> {user?.email || t("profile.noEmail")}</Text>
            <Text type="secondary" style={{ display: 'block' }}>{t("profile.gender")}: {user?.gender || "N/A"}</Text>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button type="primary" danger size="large" onClick={() => { logout(); message.info(t("profile.loggedOut")); navigate("/login"); }}>
            {t("profile.logout")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
