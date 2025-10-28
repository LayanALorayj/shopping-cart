import { Layout, Row, Col, Typography, Space } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const { Footer } = Layout;
const { Text, Title, Link } = Typography;

const AppFooter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <Footer className="footer-container">
      <Row justify="space-between" align="top" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Title
            level={5}
            className="footer-title footer-link"
            onClick={handleContactClick}
          >
            {t("footer.contactUs")}
          </Title>

          <Space direction="vertical" size="small">
            <Space>
              <PhoneOutlined />
              <Text className="footer-text">+966 53 353 0734</Text>
            </Space>

            <Space>
              <MailOutlined />
              <Link href="mailto:LayanAlorayj@Outlook.com" className="footer-link">
                LayanAlorayj@Outlook.com
              </Link>
            </Space>

            <Space>
              <EnvironmentOutlined />
              <Text className="footer-text">{t("footer.location")}</Text>
            </Space>
          </Space>
        </Col>

        <Col xs={24} sm={24} md={12} className="footer-right">
          <Title level={5} className="footer-title">
            GitHub
          </Title>
          <div className="footer-social">
            <Link
              href="https://github.com/LayanALorayj/shopping-cart"
              target="_blank"
              aria-label="GitHub"
            >
              <GithubOutlined style={{ fontSize: 24 }} />
            </Link>
          </div>
        </Col>
      </Row>

      <div className="footer-copy-center">
        <Text className="footer-copy">
          © {new Date().getFullYear()} {t("footer.siteName")}.{" "}
          {t("footer.rightsReserved")}
        </Text>
      </div>
    </Footer>
  );
};

export default AppFooter;
