import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Button, Divider, message, Spin } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { getProfile } from "../api/User";
import "../App.css";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const { accessToken, user, clearToken, _hasHydrated, setUserInfo } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (_hasHydrated && !accessToken) {
      message.warning("Please log in first");
      navigate("/login");
    }
  }, [accessToken, _hasHydrated, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;
      try {
        setLoading(true);
        const profileData = await getProfile();
         const { refreshToken } = useAuthStore.getState();
          console.log("Refresh Token:", refreshToken);

        setUserInfo(profileData);
      } catch (error: any) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken, setUserInfo]);

  if (!_hasHydrated) return <Spin size="large" style={{ marginTop: 100 }} />;
  if (!accessToken) return null;
  if (loading) return <Spin size="large" style={{ marginTop: 100 }} />;

  return (
    <div className="profile-page">
      <Card className="profile-card" bordered={false}>
        <Avatar
          size={100}
          src={user?.image}
          icon={<UserOutlined />}
          className="profile-avatar"
        />
        <Title level={3} style={{ marginTop: 15 }}>
          {user?.firstName || "Unknown"} {user?.lastName || ""}
        </Title>
        <Text type="secondary">@{user?.username}</Text>

        <Divider />

        <div className="profile-info">
          <p>
            <MailOutlined /> <strong>Email:</strong> {user?.email || "No email"}
          </p>
          <p>
            <UserOutlined /> <strong>Gender:</strong> {user?.gender || "N/A"}
          </p>
        </div>

        <Divider />

        <Button
          type="primary"
          danger
          onClick={() => {
            clearToken();
            message.info("Logged out successfully");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
