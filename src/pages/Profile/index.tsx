import React, { useEffect } from "react";
import { Card, Avatar, Typography, Button, message } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../hooks/useAuthStore";
import styles from "./index.module.css";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      message.warning("Please log in first");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className={styles.profilePage}>
      <Card className={styles.profileCard} bordered={false}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Avatar
            size={120}
            src={user?.image}
            icon={<UserOutlined />}
            className={styles.profileAvatar}
          />
          <Title level={2} style={{ marginTop: '16px' }}>
            {user?.firstName || "Unknown"} {user?.lastName || ""}
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            @{user?.username}
          </Text>
          <div style={{ marginTop: '16px' }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
              <MailOutlined /> {user?.email || "No email"}
            </Text>
            <Text type="secondary" style={{ display: 'block' }}>
              Gender: {user?.gender || "N/A"}
            </Text>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button
            type="primary"
            danger
            size="large"
            onClick={() => {
              logout();
              message.info("Logged out successfully");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;