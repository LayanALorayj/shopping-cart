import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Button, Divider, message, Spin, Row, Col, Descriptions } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, EnvironmentOutlined, IdcardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { getProfile } from "../../api/User";
import styles from "./index.module.css";

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
        setUserInfo(profileData);
      } catch (error: any) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken, setUserInfo]);

  if (!_hasHydrated) return <Spin size="large" className={styles.loadingSpinner} />;
  if (!accessToken) return null;
  if (loading) return <Spin size="large" className={styles.loadingSpinner} />;

  return (
    <div className={styles.profilePage}>
      <Card className={styles.profileCard} bordered={false}>
        <Row gutter={24} align="middle" justify="center" className={styles.headerRow}>
          <Col xs={24} sm={8} md={6}>
            <div className={styles.avatarContainer}>
              <Avatar
                size={120}
                src={user?.image}
                icon={<UserOutlined />}
                className={styles.profileAvatar}
              />
            </div>
          </Col>
          <Col xs={24} sm={16} md={18}>
            <div className={styles.infoContainer}>
              <Title level={2} className={styles.profileTitle}>
                {user?.firstName || "Unknown"} {user?.lastName || ""}
                {user?.maidenName ? ` (${user.maidenName})` : ""}
              </Title>
              <Text type="secondary" className={styles.username}>
                @{user?.username}
              </Text>
              <div className={styles.basicInfo}>
                <Text type="secondary" className={styles.infoItem}>
                  <IdcardOutlined /> Age: {user?.age || "N/A"} | {user?.gender || "N/A"}
                </Text>
                <Text type="secondary" className={styles.infoItem}>
                  <EnvironmentOutlined /> {user?.address?.country || "N/A"}
                </Text>
              </div>
            </div>
          </Col>
        </Row>

        <Divider className={styles.sectionDivider} />

        <Row gutter={16}>
          <Col span={24}>
            <Title level={4} className={styles.sectionTitle}>Contact Information</Title>
            <Descriptions 
              bordered 
              size="small" 
              column={1}
              className={styles.descriptions}
            >
              <Descriptions.Item label="Email" labelStyle={{ fontWeight: 'bold' }}>
                <MailOutlined className={styles.icon} /> 
                {user?.email || "No email"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone" labelStyle={{ fontWeight: 'bold' }}>
                <PhoneOutlined className={styles.icon} /> 
                {user?.phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Birth Date" labelStyle={{ fontWeight: 'bold' }}>
                {user?.birthDate || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Divider className={styles.sectionDivider} />

        <Row gutter={16}>
          <Col span={24}>
            <Title level={4} className={styles.sectionTitle}>Address</Title>
            <Descriptions 
              bordered 
              size="small" 
              column={1}
              className={styles.descriptions}
            >
              <Descriptions.Item label="Full Address" labelStyle={{ fontWeight: 'bold' }}>
                <HomeOutlined className={styles.icon} />
                {user?.address?.address || ""}, {user?.address?.city || ""}, {user?.address?.state || ""} {user?.address?.stateCode || ""} {user?.address?.postalCode || ""}
              </Descriptions.Item>
              <Descriptions.Item label="Coordinates" labelStyle={{ fontWeight: 'bold' }}>
                Lat: {user?.address?.coordinates?.lat || "N/A"}, Lng: {user?.address?.coordinates?.lng || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Divider className={styles.sectionDivider} />

        <Row gutter={16}>
          <Col span={24}>
            <Title level={4} className={styles.sectionTitle}>Professional Information</Title>
            <Descriptions 
              bordered 
              size="small" 
              column={1}
              className={styles.descriptions}
            >
              <Descriptions.Item label="University" labelStyle={{ fontWeight: 'bold' }}>
                {user?.university || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Company" labelStyle={{ fontWeight: 'bold' }}>
                {user?.company?.name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Department" labelStyle={{ fontWeight: 'bold' }}>
                {user?.company?.department || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Title" labelStyle={{ fontWeight: 'bold' }}>
                {user?.company?.title || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Company Address" labelStyle={{ fontWeight: 'bold' }}>
                {user?.company?.address?.address || ""}, {user?.company?.address?.city || ""}, {user?.company?.address?.state || ""} {user?.company?.address?.stateCode || ""}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Divider className={styles.sectionDivider} />

        <div className={styles.logoutContainer}>
          <Button
            type="primary"
            danger
            size="large"
            onClick={() => {
              clearToken();
              message.info("Logged out successfully");
              navigate("/login");
            }}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;