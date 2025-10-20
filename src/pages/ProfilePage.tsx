import React from "react";
import { Card, Avatar, Typography, Button, Divider } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; 
import "../App.css";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="profile-page">
      <Card className="profile-card" bordered={false}>
        <Avatar size={100} icon={<UserOutlined />} className="profile-avatar" />
        <Title level={3} style={{ marginTop: 15 }}>
          Layan
        </Title>
        <Text type="secondary">Layan2003 </Text>

        <Divider />

        <div className="profile-info">
          <p>
            <MailOutlined /> <strong>Email:</strong> layan@example.com
          </p>
          <p>
            <UserOutlined /> <strong>Username:</strong> LayanShopUser
          </p>
        </div>

        <Divider />

        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
